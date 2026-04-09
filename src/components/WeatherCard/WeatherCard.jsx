import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants.js";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const weatherOption = weatherOptions.find(
    (option) =>
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition,
  );

  return (
    <section className="weather-card">
      {weatherOption && (
        <img
          src={weatherOption.url}
          alt={`${weatherData.condition} weather`}
          className="weather-card__image"
        />
      )}
      <p className="weather-card__temp">
        {Math.round(weatherData.temp[currentTemperatureUnit])} &deg; {currentTemperatureUnit}
      </p>
      <p className="weather-card__condition">{weatherData.type}</p>
    </section>
  );
}

export default WeatherCard;
