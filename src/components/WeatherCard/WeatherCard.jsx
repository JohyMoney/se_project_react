import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants.js";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const displayCondition =
    weatherData.condition === "Clear" ? "Clear" : "Clouds";
  const weatherOption = weatherOptions.find(
    (option) =>
      option.day === weatherData.isDay &&
      option.condition === displayCondition,
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
        {weatherData.temp[currentTemperatureUnit]} ° {currentTemperatureUnit}
      </p>
      <p className="weather-card__condition">{weatherData.type}</p>
    </section>
  );
}

export default WeatherCard;
