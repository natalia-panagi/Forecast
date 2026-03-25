
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

    getForecast(response.data.city);
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
searchCity("Madrid");

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];

}

function getForecast(city){
let apiKey = "fb6a7o33d928a9e256t114bb04022298";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
axios(apiUrl).then(displayForecast);

}


function displayForecast(response) {
    console.log(response.data);

let forecastElement = document.querySelector("#forecast");
let forecastHtml = "";

response.data.daily.forEach(function(day, index) { if (index < 5){
forecastHtml =
  forecastHtml +
  `          
        <div class="forecast-day">
            <div class="forecast-weekday">${formatDay(day.time)}</div>
            <div class="forecast-emoji"> <img src = "${day.condition.icon_url}" class = "forecast-image"> </div>
            <div class="forecast-temperatures">
                <div class="forecast-temperature-high"> ${Math.round(day.temperature.maximum)}°C </div>
                <div class="forecast-temperature-low"> ${Math.round(day.temperature.minimum)}°C</div>
            </div>
        </div>
        `;
} 
});
 forecastElement.innerHTML = forecastHtml;
}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);




