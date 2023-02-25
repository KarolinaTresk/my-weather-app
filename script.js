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

function unitCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#temperature");
  celsius.innerHTML = `11`;
}

//let tempCelsius = document.querySelector("#celsius-link");
//tempCelsius.addEventListener("click", unitCelsius);

function unitFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#temperature");
  fahrenheit.innerHTML = `54`;
}

let tempFahrenheit = document.querySelector("#fahrenheit-link");
tempFahrenheit.addEventListener("click", unitFahrenheit);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  currentTemp.innerHTML = temperature;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
  let descriptionWeather = document.querySelector ("#description");
  descriptionWeather.innerHTML = response.data.weather[0].description;
  console.log(response.data.weather[0].description);

  
}

function searchCity(city) {
  let apiKey = "4ea1510a05549d524d10fc1d91f0154d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=
               ${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

searchCity("Amsterdam");