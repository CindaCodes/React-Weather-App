import React, { useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather/build/ReactAnimatedWeather";
import "./Weather.css";

const weatherIcons = {
  Clear: "CLEAR_DAY",
  Clouds: "CLOUDY",
  Rain: "RAIN",
  Snow: "SNOW",
  Thunderstorm: "WIND",
  Drizzle: "SLEET",
  Mist: "FOG",
};

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});
  const [unit, setUnit] = useState("metric");

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      icon: weatherIcons[response.data.weather[0].main] || "CLEAR_DAY",
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
    });
  }

  function fetchWeather(newUnit) {
    const apiKey = process.env.REACT_APP_API_KEY;
    const baseUrl = process.env.REACT_APP_API_URL;

    console.log("API Key:", apiKey); // Debugging
    console.log("Base URL:", baseUrl); // Debugging

    if (!apiKey || !baseUrl) {
      console.error("API Key or API URL is missing! Check your .env file.");
      return;
    }

    const apiUrl = `${baseUrl}?q=${city}&appid=${apiKey}&units=${newUnit}`;

    axios
      .get(apiUrl)
      .then(displayWeather)
      .catch((error) => {
        console.error("Error fetching weather:", error);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetchWeather(unit);
  }

  function updateCity(event) {
    setCity(event.target.value);
    setLoaded(false); // Reset weather data when typing a new city
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function toggleUnit() {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
    fetchWeather(newUnit);
  }

  return (
    <div className="weather-container">
      <h1 className="weather-title">Weather App</h1>
      <form onSubmit={handleSubmit} className="weather-form">
        <input
          type="search"
          placeholder="Enter a city.."
          onChange={updateCity}
          className="weather-input"
        />
        <button type="submit" className="weather-button">
          Search
        </button>
      </form>
      {loaded && (
        <div className="weather-card">
          <h2 className="weather-city">{capitalizeFirstLetter(city)}</h2>
          <ReactAnimatedWeather
            icon={weather.icon}
            color="#757882"
            size={64}
            animate={true}
          />
          <p className="temperature">
            {Math.round(weather.temperature)}
            {unit === "metric" ? "°C" : "°F"}
          </p>
          <p>{weather.description}</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>
            Wind: {Math.round(weather.wind)}
            {unit === "metric" ? " km/h" : " mph"}
          </p>
          <button onClick={toggleUnit} className="weather-toggle">
            Switch to {unit === "metric" ? "Imperial" : "Metric"}
          </button>
        </div>
      )}
    </div>
  );
}
