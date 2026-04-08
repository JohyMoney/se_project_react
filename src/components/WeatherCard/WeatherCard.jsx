import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants.js";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../context/CurrentTemperatureUnitcontext.jsx";

function WeatherCard({ weatherData }) {
  const {currentTemperatureUnit} = useContext(CurrentTemperatureUnitContext);
  const weatherOption = weatherOptions.find(
    (option) =>
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition,
  );

  return (
    <section className="weather-card">
      <div className={`weather-card__info ${currentTemperatureUnit === "F" ? weatherData.temp.F : weatherData.temp.C}`}></div>
      <h2 className="weather-card__city">{weatherData.city}</h2>
      <p className="weather-card__temperature">
        {Math.round(weatherData.temp[currentTemperatureUnit])} &deg; {currentTemperatureUnit}
      </p>
      <p className="weather-card__condition">{weatherData.type}</p>
      {weatherOption && (
        <img
          src={weatherOption.icon}
          alt={weatherOption.description}
          className="weather-card__icon"
        />
      )}
    </section>
  );
}

export default WeatherCard;
