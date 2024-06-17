
function refreshWeather(response){
    let temp= document.querySelector("#temp")
    let cityTemp= response.data.temperature.current
    let city= document.querySelector("#city")
    city.innerHTML= response.data.city
    temp.innerHTML= Math.round(cityTemp)
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
let btn= document.querySelector('.submit-form')
btn.addEventListener("submit",searchCity )

cityInfo("paris")