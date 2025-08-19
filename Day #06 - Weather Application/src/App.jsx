import React, { useEffect, useState } from "react";
import Search from "./components/Search.jsx";
import Box from "./components/Box.jsx";
import { WeatherIcons } from "./data/constant.js";
import Data from "./components/Data.jsx";

// Main App component
const App = () => {
  // State to store the city name
  const [city, setCity] = useState("Caloocan");
  // State to store the weather data
  const [weatherData, setWeatherData] = useState({});
  // State to store error messages
  const [error, setError] = useState({});

  // Object mapping weather condition codes to corresponding icons
  const allIcons = {
    "01d": WeatherIcons.ClearDayIcon,
    "01n": WeatherIcons.ClearNightIcon,
    "02d": WeatherIcons.FewCloudsDayIcon,
    "02n": WeatherIcons.FewCloudsNightIcon,
    "03d": WeatherIcons.ScatteredCloudsIcon,
    "03n": WeatherIcons.ScatteredCloudsIcon,
    "04d": WeatherIcons.BrokenCloudsIcon,
    "04n": WeatherIcons.BrokenCloudsIcon,
    "09d": WeatherIcons.ShowerRainIcon,
    "09n": WeatherIcons.ShowerRainIcon,
    "10d": WeatherIcons.RainDayIcon,
    "10n": WeatherIcons.RainNightIcon,
    "11d": WeatherIcons.ThunderstormIcon,
    "11n": WeatherIcons.ThunderstormIcon,
    "13d": WeatherIcons.SnowIcon,
    "13n": WeatherIcons.SnowIcon,
    "50d": WeatherIcons.MistIcon,
    "50n": WeatherIcons.MistIcon,
  };

  // API key for accessing the weather data
  const API_KEY = import.meta.env.VITE_API_KEY;

  // Function to search weather data based on the city name
  const searchWeatherData = () => {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&q=${city}&units=metric`;
    getWeatherData(API_URL);
  };

  // Function to fetch weather data based on the user's current location
  const fetchWeatherData = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&lat=${latitude}&lon=${longitude}&units=metric`;
        getWeatherData(API_URL);
      },
      () => {
        setWeatherData(false);
        setError({
          msg: "Open your location and try again",
        });
      }
    );
  };

  // useEffect hook to fetch weather data when the component mounts
  useEffect(() => {
    fetchWeatherData();
  }, []);

  // Function to get weather data from the API
  const getWeatherData = async (API_URL) => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const icons = allIcons[data.weather[0].icon] || WeatherIcons.NoResultIcon;
      setWeatherData({
        city: data.name,
        icon: icons,
        temperature: Math.floor(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      });
    } catch (error) {
      setWeatherData(false);
      setError({
        msg: "City not found",
      });
    }
  };

  return (
    <div className="mx-auto max-w-[310px] sm:max-w-sm bg-[#242526] py-5 px-4 rounded-xl">
      <Search
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onClickSearch={searchWeatherData}
        onClickFetch={fetchWeatherData}
      />
      {weatherData ? (
        <>
          <Box
            cityName={weatherData.city}
            imageName={weatherData.icon}
            temperature={weatherData.temperature}
            description={weatherData.description}
          />
          <Data
            humidity={weatherData.humidity}
            windSpeed={weatherData.windSpeed}
          />
        </>
      ) : (
        <>
          <img
            src={WeatherIcons.NoResultIcon}
            alt=""
            className="h-36 mx-auto"
          />
          <p className="text-lg sm:text-xl text-center">{error.msg}</p>
        </>
      )}
    </div>
  );
};

export default App;
