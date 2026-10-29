const apiKey = "your-key-here"; // Replace with your real API key

document.getElementById('search-btn').addEventListener('click', getWeather);
document.getElementById('city-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') getWeather();
});

function getWeather() {
    const city = document.getElementById('city-input').value.trim();
    const weatherInfo = document.getElementById('weather-info');
    const errorMsg = document.getElementById('error-msg');

    if (!city) return;

    const apiUrl = `https://openweathermap.org{city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('city-name').innerText = `${data.name}, ${data.sys.country}`;
            document.getElementById('temperature').innerText = `Temperature: ${Math.round(data.main.temp)}°C`;
            document.getElementById('description').innerText = `Condition: ${data.weather[0].description}`;
            document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;

            weatherInfo.classList.remove('hidden');
            errorMsg.classList.add('hidden');
        })
        .catch(err => {
            errorMsg.innerText = err.message;
            errorMsg.classList.remove('hidden');
            weatherInfo.classList.add('hidden');
        });
}

