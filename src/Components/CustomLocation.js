import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Graph from "./Graph";
import WeatherCard from "./WeatherCard";

const API_KEY = "AIzaSyCk5Gv7Zlgqetj_19Cr8LD-n0rYt5L2_Mg";
const weather_KEY = "1925d6c1207e47f94cefa0d29ee7c216";

export default function CustomLocation() {
  let params = useParams();

  const [weather, setWeather] = useState([]);
  const [forecast, setforecast] = useState({
    daily: [],
    lat: "",
    lon: "",
    length: "",
  });

  const getHourlyWeather = async (name) => {
    let q = `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${API_KEY}`;
    axios.get(q).then((data) => {
      // console.log("COORDS: ", data);
      let lat = data.data.results[0].geometry.location.lat;
      let lon = data.data.results[0].geometry.location.lng;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&appid=${weather_KEY}&units=metric`
        )
        .then((res) => {
          // console.log("Hourly:", res.data);
          let temp = res.data.hourly.map((i) => {
            var x = new Date(i.dt * 1000);
            return { ...i, time: x.toUTCString().split(" ")[4] + " GMT" };
          });

          setforecast(res.data);

          setWeather(temp.slice(0, 24));
          // console.log("Sliced", temp.slice(0, 24));
        });
    });
  };

  useEffect(() => {
    getHourlyWeather(params.city);
  }, [params.city]);

  return (
    <div>
      <div className="text-center text-3xl bg-indigo-200 p-2 w-1/2 mx-auto">
        {params.city}
      </div>
      <div className="text-center p-4">24 Hour Forecast</div>
      <div className="text-center">
        {!weather ? (
          "Loading"
        ) : (
          <div className="mx-auto inline-block m-4">
            <Graph data={weather}></Graph>
          </div>
        )}
      </div>
      <div className="text-center text-xl ">Next 7 days forecast: </div>
      <div className="md:w-2/3 mx-auto lg:w-1/2">
        <div>
          {forecast.daily.length <= 1
            ? "Loading"
            : forecast.daily.map((day, index) =>
                index < 5 ? (
                  <div key={index}>
                    <div className="my-6 text-center">
                      Day: {index === 0 ? "Today's" : index + 1}
                    </div>
                    <WeatherCard
                      index={index}
                      day={day}
                      coords={{ lat: forecast.lat, lon: forecast.lon }}
                    ></WeatherCard>
                  </div>
                ) : (
                  ""
                )
              )}
        </div>
      </div>
    </div>
  );
}
