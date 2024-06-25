
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
    console.log(response)
    city.innerHTML= response.data.city
    temp.innerHTML= Math.round(cityTemp)
    timeElement.innerHTML= formatDate(time)
    weatherIcon.innerHTML= `<img src=" ${response.data.condition.icon_url}" class="weather-temp-icon"> `
    description.innerHTML= response.data.condition.description
    humidityElement.innerHTML= `Humidity: ${response.data.temperature.humidity}%`
    windElement.innerHTML= `Wind: ${response.data.wind.speed} km/h`
    console.log(response)
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
function displayforecast(){
    let forecastElement= document.querySelector("#forecast")
    days= ["Tue", "Wed", "Thu", "Fri", "Sat"]
    forecastHtml= ""
    days.forEach(function (day) {
        forecastHtml = forecastHtml+ `
                        <div class="col" >
                            <div class="weather-forecast-day">${day}</div>
                            <div class="weather-forecast-icon">⛅</div>
                            <div class="weather-forecast-temp">
                                <div class="max-temp">22°</div>
                                <div class="min-temp">12°</div>
                            </div>
                        </div>
        `
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