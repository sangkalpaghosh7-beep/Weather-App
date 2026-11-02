let search = document.querySelector("#search-inp");
let cityInput = document.querySelector("#weather-inp");
let body = document.querySelector("body");
let img = document.querySelector("#img");
let cityName = document.querySelector("#cityName");
let temp = document.querySelector("#temp");
let hum = document.querySelector(".hum");
let wind = document.querySelector(".wind");
let press = document.querySelector(".press");
let weatherType = document.querySelector("#weatherType");
let date = document.querySelector("#date");
let time = document.querySelector("#time");

const apiKey = "9ad2d96561ba1fa1e23087ee9e80ff60";

const cityImages = {
    kolkata: "kolkata.jpg",
    siliguri: "siliguri.jpg",
    shimla: "shimla.jpg",
    mumbai: "mumbai.jpg"
};

search.addEventListener("click", function () {

    let city = cityInput.value.trim().toLowerCase();

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    if (cityImages[city]) {
        body.style.backgroundImage = `url('${cityImages[city]}')`;
    } else {
        alert("Background image is not available for this city!");
        return;
    }

    cityName.textContent = cityInput.value.trim();

    APIcall(city);
});

window.addEventListener("DOMContentLoaded", function(){
    let defaultCity = "siliguri";

    cityName.textContent = defaultCity;

    APIcall(defaultCity);
})
function APIcall(city) {

    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(api)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found!");
            }
            return response.json();
        })
        .then((data) => {

            let temperature = Math.trunc(data.main.temp);
            let humidity = data.main.humidity;
            let windSpeed = (data.wind.speed * 3.6).toFixed(1);
            let pressure = data.main.pressure;
            let weatherDesc = data.weather[0].description;
            let icon = data.weather[0].icon;
            let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            temp.textContent = `${temperature} °C`;
            hum.textContent = `${humidity}%`;
            wind.textContent = `${windSpeed} km/h`;
            press.textContent = `${pressure} hPa`;

            weatherType.textContent = weatherDesc;

            img.src = iconUrl;
        })

        .catch((error) => {
            alert(error.message);
        });

}

function updateDateTime() {

    let now = new Date();

    date.textContent = now.toLocaleDateString();
    time.textContent = now.toLocaleTimeString();

}

updateDateTime();

setInterval(updateDateTime, 1000);