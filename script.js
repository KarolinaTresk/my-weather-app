let now = new Date();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let h2 = document.querySelector("h2");
h2.innerHTML = `${day}, ${hours}:${minutes}`;


let form = document.querySelector("#search-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let input = document.querySelector("#text-input");
  searchCity(input.value);
});



function displayForecast (response) {
  console.log(response.data.daily);

  let forecastElement = document.querySelector ("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach (function(day) {
     forecastHTML = forecastHTML +
       `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  
  });
 
forecastHTML = forecastHTML + `</div`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {

  let apiKey = "4ea1510a05549d524d10fc1d91f0154d";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  
  axios.get (apiUrl).then (displayForecast);
}


function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  let city = document.querySelector("h1");
  let windSpeed = document.querySelector("#wind");
  let descriptionWeather = document.querySelector("#description");
  let description = response.data.weather[0].description;

  city.innerHTML = response.data.name;
  currentTemp.innerHTML = temperature;
  currentTemp.dataset.temperature = temperature;
  windSpeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
  descriptionWeather.innerHTML =
    description.charAt(0).toUpperCase() + description.slice(1);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);


  getForecast (response.data.coord);




}


function searchCity(city) {
  let apiKey = "4ea1510a05549d524d10fc1d91f0154d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

searchCity("Amsterdam");

