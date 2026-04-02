const getWeather = (coordinates, apiKey) => {
  const { latitude, longitude } = coordinates;
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${res.status}`);
  });
};

const filterWeatherData = (data) => {
  const result = {};

  result.city = data.name;
  result.temp = {
    F: data.main.temp,
    C: (((data.main.temp - 32) * 5) / 9).toFixed(2),
  };
  result.type = getWeatherType(data.main.temp);
  result.isDay = isDay(data.dt, data.sys.sunrise, data.sys.sunset);
  result.condition = data.weather[0].main;

  return result;
};

const isDay = (currentTime, sunrise, sunset) => {
  return sunrise < currentTime && currentTime < sunset;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else if (temperature < 66) {
    return "cold";
  }
};

export { getWeather, filterWeatherData, getWeatherType, isDay };
