export default function WeatherCard({ day, index, lat, lon, coords }) {
  const iconCode = day.weather[0].icon;
  var myDate = new Date(day.dt * 1000);
  var sunrise = new Date(day.sunrise * 1000);
  var sunset = new Date(day.sunset * 1000);
  var description = day.weather[0].description;

  // console.log("day: ", day);
  // console.log(coords);

  const temps = day.temp;
  return (
    <div className="ring-2 m-4 p-4 bg-blue-100 shadow-2xl text-left hover:-translate-y-4 transition ease-in-out">
      <div> Time: {myDate.toUTCString()} </div>
      <div className="flex justify-evenly p-4">
        <div className="text-center">
          <figure>
            <img
              src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`}
              alt="Loading..."
            ></img>
            <figcaption>
              {description[0].toUpperCase() + description.substring(1)}
            </figcaption>
          </figure>
        </div>
        <div className="bg-gray-100 px-6 py-4 ring-2">
          <ul className="list-disc">
            <li>High Temperature: {temps.max} °C</li>
            <li>Low Temperature: {temps.min} °C</li>
            <li>
              Geo coordinates: Latitude={coords.lat} <br /> Longitude=
              {coords.lon}
            </li>
            <li>Humidity= {day.humidity}%</li>
            <li> Sunrise= {sunrise.toUTCString()}</li>
            <li>Sunset= {sunset.toUTCString()}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
