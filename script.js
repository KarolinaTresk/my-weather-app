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

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  if (celsiusTemperature === null) {
    celsiusTemperature = Math.round(
      ((temperatureElement.dataset.temperature - 32) * 5) / 9
    );
  }
  temperatureElement.innerHTML = `${celsiusTemperature}`;
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.classList.add("active");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.classList.remove("active");
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = Math.round(
    (temperatureElement.dataset.temperature * 9) / 5 + 32
  );
  temperatureElement.innerHTML = `${fahrenheitTemperature}`;
  celsiusTemperature = null;
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.classList.remove("active");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.classList.add("active");
}


let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);



function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = temperature;
  currentTemp.dataset.temperature = temperature;
    celsiusTemperature = null;
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
  let descriptionWeather = document.querySelector("#description");
  let description = response.data.weather[0].description;
  descriptionWeather.innerHTML =
    description.charAt(0).toUpperCase() + description.slice(1);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function searchCity(city) {
  let apiKey = "4ea1510a05549d524d10fc1d91f0154d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

searchCity("Amsterdam");
