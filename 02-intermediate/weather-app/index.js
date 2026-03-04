const apiKey="20303a6da2cef17826d136dbd8a98f67";

async function getWeather(){

    const city=document.getElementById("cityInput").value;

    if(city===""){
        alert("Please enter a city name");
        return;
    }

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{
        const response=await fetch(url);
        if(!response.ok){
            throw new Error("City not found. Try again.");
        }

        const data=await response.json();

        displayWeather(data);

    }
    catch(error){
        alert(error.message);
    }
}


function getWeatherIcon(weatherMain){

    const icons={
        Clear:"wi-day-sunny",
        Clouds:"wi-cloud",
        Rain:"wi-rain",
        Drizzle:"wi-showers",
        Thunderstorm:"wi-thunderstorm",
        Snow:"wi-snow",
        Mist:"wi-fog",
        Fog:"wi-fog",
        Haze:"wi-day-haze",
        Smoke:"wi-smoke",
        Dust:"wi-dust"
    };

    return icons[weatherMain] || "wi-na";
}


function displayWeather(data){

    document.getElementById("cityName").textContent=`${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent=`Temperature: ${data.main.temp} °C`;

    document.getElementById("description").textContent=`Condition: ${data.weather[0].description}`;

    document.getElementById("humidity").textContent=`Humidity: ${data.main.humidity}%`;

    document.getElementById("wind").textContent=`Wind Speed: ${data.wind.speed} m/s`;

    const weatherMain=data.weather[0].main;
    console.log(weatherMain);

    const iconClass=getWeatherIcon(weatherMain);

    const iconElement = document.getElementById("weatherIcon");
    iconElement.className = "wi " + iconClass;

}


document.getElementById("cityInput").addEventListener("keypress", function(event){
    if(event.key==="Enter"){
        getWeather();
    }
});