const Weather = ({ country, weather }) => {
  const convertKelvinToCelsius = (degrees) => {
    return Math.floor(degrees - 273.15);
  };

  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      <p>Temperature: {convertKelvinToCelsius(weather.main.temp)}°C</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
      <p>Wind: {weather.wind.speed}m/s</p>
    </div>
  );
};

export default Weather;
