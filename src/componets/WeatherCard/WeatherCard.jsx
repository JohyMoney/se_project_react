
import './WeatherCard.css'
import { weatheroptions } from '../../utils/constants.js'

function WeatherCard({ filterWeatherData = { isDay: true, condition: 'Clear', temp: { F: 75 } } }) {
  const weatherOption = weatheroptions.filter((option) => {
    return option.day === filterWeatherData.isDay && option.condition === filterWeatherData.condition;
  })[0]

  const weatherOptionURL = weatheroptions.filter((option) => {
    return option.day === filterWeatherData.isDay && option.condition === filterWeatherData.condition;
  })[0]

  const weathercondition = fileredOptions[0]?.condition


  return (
    <section className="weather-card">
      <p className="weather-card__temp">{filterWeatherData.temp.F} &deg; F</p>
      <img src={weatherOption?.url} alt={filterWeatherData.condition} className="weather-card__image" />
      <p className="weather-card__condition">{filterWeatherData.condition}</p>
    </section>
  )
}

export default WeatherCard