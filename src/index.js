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
  try {
    const response = await fetch(
      `${basedAPI}/current.json?key=${API_KEY}&q=${location}`
    );
    const weatherData = await processJsonData(response);
    console.log(weatherData);
  } catch (error) {
    console.log(error);
  }
}

getWeatherData("London");
