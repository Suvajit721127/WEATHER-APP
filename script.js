async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "474eda816598747b46e8e85c2c9aaad0"; // Replace with your OpenWeatherMap API key
  const weatherInfo = document.getElementById("weatherInfo");

  if (city === "") {
    weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      weatherInfo.innerHTML = "<p>City not found. Please try again.</p>";
      return;
    }

    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherInfo.innerHTML = `
      <img src="${icon}" alt="${data.weather[0].description}">
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>${data.main.temp}°C</strong></p>
      <p>${data.weather[0].main} - ${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    weatherInfo.innerHTML = "<p>Error fetching data. Please try again.</p>";
    console.error(error);
  }
}
