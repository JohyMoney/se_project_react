const getWeather = (coordinates, APIKey) => {
    const { latitude, longitude } = coordinates;
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIKey}`)
      .then((res) => {
        if (!res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Error: ${res.status}`);
        }
      });
};

 export const filterWeatherData = (data) => {
    const result = {
 result.city = data.name;
 result.temp= { F: data.main.temp,  C: ((data.main.temp - 32) * 5 / 9).toFixed(2) };
 return result;


    };
};


export { getWeather, filterWeatherData };