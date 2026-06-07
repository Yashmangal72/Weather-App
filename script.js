const getData = document.getElementById("getData");
const cityName = document.getElementById("cityName");
const cityTemp = document.getElementById("cityTemp");
const condition = document.getElementById("condition");
const inputCity = document.getElementById("inputCity");
const weatherIcon = document.getElementById("weatherIcon");



async function getWeather (){
    try {
    const city = inputCity.value;
    const apiKey = "b4c70bb8d3f14d94bf441839260706"
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

cityName.textContent = "Loading...";
cityTemp.textContent = "";
condition.textContent = "";

    const response = await fetch(url);
    const data = await response.json();

    if(data.error){
    throw new Error(data.error.message);
}

    cityName.textContent = data.location.name;
    cityTemp.innerHTML = `${data.current.temp_c}&deg;C`;
    condition.textContent = data.current.condition.text;
    weatherIcon.style.display = "block";
    weatherIcon.src = `https:${data.current.condition.icon}`;
}
    catch(error){
    cityName.textContent = "City not found";
    cityTemp.textContent = "";
    condition.textContent = "";
    weatherIcon.style.display = "none";
}

}

getData.addEventListener("click", getWeather)

inputCity.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        getWeather();
    }
});