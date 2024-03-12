import "./style.css";

const API_KEY = "3253784739874ed798940459240803";
const basedAPI = "http://api.weatherapi.com/v1";

let weatherData = {};

async function processJsonData(data) {
  const jsonData = await data.json();

  // extracting only meaningful data to user
  return new Promise((resolve) => {
    resolve({
      locationData: {
        country: jsonData.location.country,
        localTime: jsonData.location.localtime,
        name: jsonData.location.name,
        region: jsonData.location.region,
      },
      currentWeather: jsonData.current,
    });
  });
}

async function getWeatherData(location) {
  try {
    const response = await fetch(
      `${basedAPI}/current.json?key=${API_KEY}&q=${location}`
    );
    if (response.status >= 400 && response.status < 600) {
      const section = document.getElementById("weather-section");
      section.innerHTML = `Error! Location either does not exist or there was a problem when retrieving response from the server.`;
      section.style.color = "red";
      section.style.backgroundColor = "lightpink";
      throw new Error("Bad response from server");
    }
    return processJsonData(response);
  } catch (error) {
    console.log(error);
  }
  return undefined;
}

let isC = false;
function render(data) {
  document.getElementById("toggle-section").hidden = false;
  const location = data.locationData;
  const weather = data.currentWeather;

  const content = document.getElementById("content");
  content.innerHTML = `
    <div>${location.name}, ${location.country}</div>
    <div>Local time: ${location.localTime}</div>
    <img src="https:${weather.condition.icon}">
    <div id="temperature">${weather.temp_c}&deg</div>
  `;
}

function toggleTemp(e) {
  isC = e.target.checked;
  const temperatureElement = document.getElementById("temperature");
  temperatureElement.innerHTML = "";
  const temperature = isC
    ? weatherData.currentWeather.temp_f
    : weatherData.currentWeather.temp_c;
  temperatureElement.innerHTML = `${temperature}&deg`;
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
  if (weatherData) render(weatherData);
});
