import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants.js";

function WeatherCard({ weatherData }) {
  const weatherOption = weatherOptions.find(
    (option) =>
      option.day === weatherData.isDay && option.condition === weatherData.condition
  );

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{Math.round(weatherData.temp.F)} &deg; F</p>
      <img
        src={weatherOption?.url}
        alt={weatherData.condition}
        className="weather-card__image"
      />
      <p className="weather-card__condition">{weatherData.condition}</p>
    </section>
  );
}

export default WeatherCard;