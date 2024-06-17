
function searchCity(event){
    event.preventDefault()
    let searchInp= document.querySelector("#search-inp")
    let city= document.querySelector("#city")
    city.innerHTML= searchInp.value
    
}
let btn= document.querySelector('.submit-form')
btn.addEventListener("submit",searchCity )