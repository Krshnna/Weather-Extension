require("dotenv").config();

document.addEventListener('DOMContentLoaded', function () {
    const locationElem = document.getElementById('location');
    const tempElem = document.getElementById('temperature');
    const descriptionElem = document.getElementById('description');
  
    // Get user's location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
  
        const apiUrl = `process.env.ApiUrl/${latitude}/${longitude}`;
        const apiKey = process.env.ApiKey;
        const apiHost = process.env.apiHost;

        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': apiHost,
          }
        };
  
        try {
          const response = await fetch(apiUrl, options);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          
          const data = await response.json();
          locationElem.textContent = `Weather in ${data.sys.name}, ${data.sys.country}`;
          tempElem.textContent = `${Math.round(data.main.temp)}°C`
          descriptionElem.textContent = data.weather[0].description;
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      });
    }
  });
  