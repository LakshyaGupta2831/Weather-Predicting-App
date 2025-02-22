const apiKey = "6c80e233e68f3c045d23acb6156789ea";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        let weatherCondition = data.weather[0].main.toLowerCase();
        let temperature = data.main.temp;

        //condition//
        if (weatherCondition.includes("snow") || temperature <= 0) {
            weatherIcon.src = "snow.png";  
        } else if (weatherCondition.includes("clear")) {
            weatherIcon.src = "clear.png";  
        } else if (weatherCondition.includes("clouds")) {
            weatherIcon.src = "clouds.png";
        } else if (weatherCondition.includes("rain")) {
            weatherIcon.src = "rain.png";
        } else if (weatherCondition.includes("drizzle")) {
            weatherIcon.src = "drizzle.png";
        } else if (weatherCondition.includes("mist") || weatherCondition.includes("fog")) {
            weatherIcon.src = "mist.png";
        } else {
            weatherIcon.src = "clouds.png"; 
        }

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(temperature) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
