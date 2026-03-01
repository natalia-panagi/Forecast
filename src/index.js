
function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sunday", 
        "Monday", 
        "Tuesday",
        "Wednesday", 
        "Thursday", 
        "Friday",
         "Saturday",]
         ;
     let day = days[date.getDay()];
     return `${day} ${hours}:${minutes}`;
     if (minutes < 10){
        minutes = `0${minutes}`;
     }
   }

function refreshWeather(response){
    
    
       let temperatureElement = document.querySelector("#current-t");
       let temperature = response.data.temperature.current;
       temperatureElement.innerHTML = Math.round(temperature);
       let cityElement = document.querySelector("#city");
       cityElement.innerHTML = response.data.city;
      
       let skyElement = document.querySelector("#sky");
       skyElement.innerHTML = response.data.condition.description;

       let windyElement = document.querySelector("#windy");
       windyElement.innerHTML = response.data.wind.speed;

       let humidElemenent = document.querySelector("#humid");
       humidElemenent.innerHTML = `${response.data.temperature.humidity}%`;

       let date = new Date(response.data.time * 1000);
       let timeElement = document.querySelector("#time");
       timeElement.innerHTML = formatDate(date);

       let iconElement = document.querySelector("#icon");
       iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class=current-temperature-icon/>`;


   }



function searchCity(city) {
    let apiKey = "fb6a7o33d928a9e256t114bb04022298"; 
    let apiUrl =
      `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(refreshWeather);
}
function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city");
    
    searchCity (searchInput.value);
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Madrid");



