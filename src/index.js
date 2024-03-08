import "./style.css";

const API_KEY = "3253784739874ed798940459240803";

// default
let location = "London";

async function getWeatherData() {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`
    );
    const weatherData = await response.json();
    console.log(weatherData);
  } catch (error) {
    console.log(error);
  }
}

getWeatherData();
