// Open-Meteo Free API (No Key Required)
// Note: Real world me hum OpenWeatherMap use karte hain par uske liye Key chahiye hoti hai.
// Yahan hum Geocoding API se City -> Lat/Long nikalenge, fir Weather API call karenge.

const apiKey = ""; // No key needed for Open-Meteo
const apiUrl = "https://api.open-meteo.com/v1/forecast?current_weather=true";

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const errorMsg = document.getElementById('errorMsg');
    const weatherInfo = document.getElementById('weatherInfo');

    if (!city) return;

    try {
        // 1. Get Lat/Long for City
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
        const geoData = await geoResponse.json();

        if (!geoData.results) {
            errorMsg.style.display = "block";
            weatherInfo.style.display = "none";
            return;
        }

        const { latitude, longitude, name } = geoData.results[0];

        // 2. Get Weather for Lat/Long
        const weatherResponse = await fetch(`${apiUrl}&latitude=${latitude}&longitude=${longitude}`);
        const weatherData = await weatherResponse.json();

        // 3. Update UI
        document.getElementById('city').innerText = name;
        document.getElementById('temp').innerText = Math.round(weatherData.current_weather.temperature) + "°C";
        document.getElementById('wind').innerText = weatherData.current_weather.windspeed + " km/h";
        // Open-Meteo simple API me humidity nahi hoti current_weather me, so hardcode for demo or use advanced endpoint
        document.getElementById('humidity').innerText = "N/A";

        weatherInfo.style.display = "block";
        errorMsg.style.display = "none";

    } catch (error) {
        console.error(error);
        errorMsg.style.display = "block";
        weatherInfo.style.display = "none";
    }
}
