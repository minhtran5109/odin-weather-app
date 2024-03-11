import "./style.css";

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

function render(data) {
  const content = document.getElementById("content");
  const location = data.locationData;
  const weatherData = data.currentWeather;
  const temperature = weatherData.temp_c;
  content.innerHTML = `
    <div>${location.name}, ${location.country}</div>
    <div>Local time: ${location.localTime}</div>
    <img src="https:${weatherData.condition.icon}">
    <div>${temperature}&deg</div>
  `;
}

const search = document.getElementById("search");
const searchBtn = document.getElementById("search-weather");
let weatherData = {};
searchBtn.addEventListener("click", async () => {
  const searchTerm = search.value ? search.value : "Sydney";
  weatherData = await getWeatherData(searchTerm);
  console.log(weatherData);
  render(weatherData);
});
