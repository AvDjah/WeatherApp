import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import WeatherCard from "./Components/WeatherCard";
import SearchBar from "./Components/SearchBar";
import { useParams } from "react-router-dom";
import { data } from "autoprefixer";
import { API_KEY } from "./apikey";

function WApp() {
  // const API_KEY = "1925d6c1207e47f94cefa0d29ee7c216";

  let params = useParams();
  // console.log("params:", params);

  const [weather, setWeather] = useState([]);
  const [coords, setcoords] = useState({ lat: "", lon: "" });
  let lat, lon;

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          // console.log(location);
          lat = location.coords.latitude;
          lon = location.coords.longitude;

          axios
            .get(
              `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,current,minutely,alerts&appid=${API_KEY}&units=metric`
            )
            .then((data) => {
              // console.log("Data: ", data);
              setWeather(data.data.daily);
              setcoords({ lat: lat, lon: lon });
            });
        },
        (err) => {
          lat = 28.6586;
          lon = 77.1291;

          axios
            .get(
              `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,current,minutely,alerts&appid=${API_KEY}&units=metric`
            )
            .then((data) => {
              // console.log("Data: ", data);
              setWeather(data.data.daily);
              setcoords({ lat: lat, lon: lon });
            });
        }
      );
    } else {
      lat = 28.6586;
      lon = 77.1291;

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,current,minutely,alerts&appid=${API_KEY}&units=metric`
        )
        .then((data) => {
          // console.log("Data: ", data);
          setWeather(data.data.daily);
          setcoords({ lat: lat, lon: lon });
        });
    }
  };
  useEffect(() => {
    getLocation();
  }, []);
  return (
    <div className="App md:w-2/3 mx-auto lg:w-1/2">
      <div>
        <SearchBar></SearchBar>
      </div>
      <div className="text-center text-3xl">Forecast for your Location:</div>
      <div>
        {weather.length === 0
          ? "Loading"
          : weather.map((day, index) =>
              index < 5 ? (
                <div key={index}>
                  <div className="my-6">
                    Day: {index === 0 ? "Today's" : index}
                  </div>
                  <WeatherCard
                    index={index}
                    day={day}
                    coords={coords}
                  ></WeatherCard>
                </div>
              ) : (
                ""
              )
            )}
      </div>
    </div>
  );
}

export default WApp;
