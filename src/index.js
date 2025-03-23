let locationValue = document.querySelector('.location');
const date = document.querySelector('.date');
const units = document.querySelector('.units');
const button = document.querySelector('#submit-button');
const currentLocation = document.querySelector('.current-location');
const currentCondition = document.querySelector('.current-condition');
const description = document.querySelector('.description');

const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const errorMessage = document.querySelector('.errorMessage');
const formWeather = document.querySelector('.weather-form');

async function weatherData(place) {
  try {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=9477ZQ4X3T4NZEWR3H25LGY27`;
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    currentCondition.textContent = `current condition is:  ${data.currentConditions.conditions}`;
    currentLocation.textContent = data.resolvedAddress;
    description.textContent = `About weather: ${data.description}`;

    temperature.textContent = `Current Temperature: ${data.currentConditions.temp} F`;
    humidity.textContent = `Humidity: ${data.currentConditions.humidity}%`;

    return data;
  } catch (error) {
    errorMessage.textContent = `Failed to fetch weather data: ${error.message}`;
    throw error;
  }
}

async function weather(event) {
  event.preventDefault();
  errorMessage.textContent = '';
  const place = locationValue.value.trim();
  if (!place) {
    errorMessage.textContent = 'Please enter a location';
    return;
  }
  try {
    const url = await weatherData(place);
    console.log(url);
  } catch (error) {
    console.error(error);
  }
}
formWeather.addEventListener('submit', weather);
