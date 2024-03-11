import "./style.css";
import toggleSwitch from "./toggleSwitch";

const API_KEY = "3253784739874ed798940459240803";
const basedAPI = "http://api.weatherapi.com/v1";

// default
// let location = "London";

async function processJsonData(data) {
  const jsonData = await data.json();
  // console.log(jsonData);
  // extracting only meaningful data to user
  return new Promise((resolve, reject) => {
    resolve({
      locationData: {
        country: jsonData.location.country,
        localTime: jsonData.location.localtime,
        name: jsonData.location.name,
        region: jsonData.location.region,
      },
      currentWeather: jsonData.current,
    });
    reject(new Error("Something went wrong when retrieving the API"));
  });
}

async function getWeatherData(location) {
  const response = await fetch(
    `${basedAPI}/current.json?key=${API_KEY}&q=${location}`
  );
  const weatherData = await processJsonData(response);
  return weatherData;
  // console.log(error);
}

let isC = false;
function render(data) {
  document.getElementById("toggle-section").hidden = false;
  const content = document.getElementById("content");
  const location = data.locationData;
  const weatherData = data.currentWeather;
  content.innerHTML = `
    <div>${location.name}, ${location.country}</div>
    <div>Local time: ${location.localTime}</div>
    <img src="https:${weatherData.condition.icon}">
    <div id="temperature">${weatherData.temp_c}&deg</div>
  `;
}
let weatherData = {};
function toggleTemp(e) {
  isC = e.target.checked;
  const temperatureElement = document.getElementById("temperature");
  temperatureElement.innerHTML = "";
  const temperature = isC
    ? weatherData.currentWeather.temp_f
    : weatherData.currentWeather.temp_c;
  temperatureElement.innerHTML = `${temperature}&deg`;
  // console.log(isC);
}

const tempToggle = document.getElementById("temp-toggle");
if (tempToggle) {
  tempToggle.addEventListener("change", (e) => toggleTemp(e));
}

const search = document.getElementById("search");
const searchBtn = document.getElementById("search-weather");

searchBtn.addEventListener("click", async () => {
  const searchTerm = search.value ? search.value : "Sydney";
  weatherData = await getWeatherData(searchTerm);
  console.log(weatherData);
  render(weatherData);
});
