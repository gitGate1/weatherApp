
function refreshWeather(response){
    let temp= document.querySelector("#temp")
    let cityTemp= response.data.temperature.current
    let city= document.querySelector("#city")
    let timeElement= document.querySelector("#time")
    let description= document.querySelector("#description")
    let humidityElement= document.querySelector("#humidity")
    let windElement= document.querySelector("#wind")
    let time= new Date(response.data.time * 1000)
    let weatherIcon= document.querySelector("#icon")
   
    city.innerHTML= response.data.city
    temp.innerHTML= Math.round(cityTemp)
    timeElement.innerHTML= formatDate(time)
    weatherIcon.innerHTML= `<img src=" ${response.data.condition.icon_url}" class="weather-temp-icon"> `
    description.innerHTML= response.data.condition.description
    humidityElement.innerHTML= `Humidity: ${response.data.temperature.humidity}%`
    windElement.innerHTML= `Wind: ${response.data.wind.speed} km/h`
    
    getForecast(response.data.city)
}

function formatDate(dateString) {
    let time = new Date(dateString);
    let hour = time.getHours();
    let minute = time.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[time.getDay()];
   

    if (minute < 10 ){
        minute = "0" + minute;
    }
    return `${day} ${hour}:${minute}`;
}

function formatDay(timestamp){
    let date = new Date(timestamp * 1000)
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return days[date.getDay()]
}
function getForecast(city){
    let apiKey = "ac97dbdbo283f0b8fa3e34tfec52460e"
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`
    axios.get(apiUrl).then(displayforecast)
}
function displayforecast(response){
    
    let forecastElement= document.querySelector("#forecast")
    
    forecastHtml= ""
    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
        forecastHtml = forecastHtml+ `
                        <div class="col" >
                            <div class="weather-forecast-day">${formatDay(day.time)}</div>
                            <div class="weather-forecast-icon"><img src= "${day.condition.icon_url}" width= 50%></div>
                            <div class="weather-forecast-temp">
                                <div class="max-temp">${Math.round(day.temperature.maximum)}°</div>
                                <div class="min-temp">${Math.round(day.temperature.minimum)}°</div>
                            </div>
                        </div>
        `}
    });

    forecastElement.innerHTML= forecastHtml
}
function cityInfo(city){
    let apiKey= "ac97dbdbo283f0b8fa3e34tfec52460e"
    let apiUrl= `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`
    axios.get(apiUrl).then(refreshWeather);
}
function searchCity(event){
    event.preventDefault()
    let searchInp= document.querySelector("#search-inp")
    
    cityInfo(searchInp.value)
}
let formSubmit= document.querySelector('.submit-form')
formSubmit.addEventListener("submit",searchCity )

cityInfo("paris")
displayforecast()