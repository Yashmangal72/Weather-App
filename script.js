const getData = document.getElementById("getData");
const cityName = document.getElementById("cityName");
const cityTemp = document.getElementById("cityTemp");
const condition = document.getElementById("condition");
const inputCity = document.getElementById("inputCity");
const windSpeed = document.getElementById("windSpeed");
const humidity = document.getElementById("humidity");
const maxTemp = document.getElementById("maxTemp");
const minTemp = document.getElementById("minTemp");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const feelTemp = document.getElementById("feelTemp");
const date = document.getElementById("date");
const welcome = document.getElementById("welcome");




async function getWeather (){
    try {
    const city = inputCity.value;
    const apiKey = "b4c70bb8d3f14d94bf441839260706"
    const url =`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1`;

    cityName.textContent = "Loading...";
    cityTemp.textContent = "";
    condition.textContent = "";
    feelTemp.textContent = "";
    condition.textContent = "";
    windSpeed.textContent = "";
    humidity.textContent = "";
    maxTemp.textContent = "";
    minTemp.textContent = "";
    sunrise.textContent = "";
    sunset.textContent = "";
    date.textContent = "";
    welcome.textContent = "";

    const response = await fetch(url);
    const data = await response.json();
    const forecast = data.forecast.forecastday[0];
    const astro = data.forecast.forecastday[0].astro;
    const weatherCondition = data.current.condition.text.toLowerCase();

    document.getElementById("weather").style.display = "flex";


    if(weatherCondition.includes("sunny")){
    document.body.style.backgroundImage =
        "url('materials/sunny.png')";
    }else if(weatherCondition.includes("partly cloudy")){
    document.body.style.backgroundImage =
        "url('materials/pcloudy.png')";
    }
    else if(weatherCondition.includes("cloudy")){
    document.body.style.backgroundImage =
        "url('materials/cloudy.png')";
    }else if(weatherCondition.includes("rain")){
    document.body.style.backgroundImage =
        "url('materials/rainy.png')";
    }else if(weatherCondition.includes("mist")){
    document.body.style.backgroundImage =
        "url('materials/mist.png')";
    }else if(weatherCondition.includes("fog")){
    document.body.style.backgroundImage =
        "url('materials/foggy.png')";
    }else {
        document.body.style.backgroundColor = "#ACB6E5";
    }



    if(data.error){
    throw new Error(data.error.message);
}

    cityName.textContent = `🌍 City: ${data.location.name} `;
    cityTemp.innerHTML = `🌡️ Current Temperature: ${data.current.temp_c}&deg;C`;
    feelTemp.innerHTML = `🤗 Feel like: ${data.current.feelslike_c}&deg;C`;
    condition.textContent = `☁️ Condition: ${data.current.condition.text}`;
    windSpeed.textContent = `🌬️ Wind Speed: ${data.current.wind_kph} Km/h`;
    humidity.textContent = `💧 Humidity: ${data.current.humidity} %`;
    maxTemp.innerHTML = `🔥 Maximum Temperature: ${forecast.day.maxtemp_c}&deg;C`;
    minTemp.innerHTML = `❄️ Minimun Temperature: ${forecast.day.mintemp_c}&deg;C`;
    sunrise.textContent = `🌅 Sunrise Time: ${astro.sunrise}`;
    sunset.textContent = `🌇 Sunset Time: ${astro.sunset}`;
    date.textContent = `📅 Date: ${forecast.date}`;
}
    catch(error){
    cityName.textContent = "City not found";
    cityTemp.textContent = "";
    feelTemp.textContent = "";
    condition.textContent = "";
    windSpeed.textContent = "";
    humidity.textContent = "";
    maxTemp.textContent = "";
    minTemp.textContent = "";
    sunrise.textContent = "";
    sunset.textContent = "";
    date.textContent = "";
    document.getElementById("weather").style.display = "none";
}

}

getData.addEventListener("click", getWeather)

inputCity.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        getWeather();
    }
});