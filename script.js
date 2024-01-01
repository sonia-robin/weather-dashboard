var apiKey = "f2d3f1b582a7074aba258738949ac0ae";
var lat = 51.5073219;
var lon = -0.1276474;
var apiCall = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
var currentDate = dayjs().format("DD/MM/YYYY");

console.log(apiCall);

var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=f2d3f1b582a7074aba258738949ac0ae"

fetch (apiCall)
.then(function (response){
    return response.json();
})
.then(function (data){
    console.log(data)

    // retrieving city name
    var cityName = data.city.name;
    console.log(cityName);

    // retrieving date
    var date = data.list[0].dt_txt;
    console.log(date);
    // retrieving weather icon ID
    var iconId = data.list[0].weather[0].icon;
    console.log(iconId);
    // display weather icon
    var iconUrl =  "https://openweathermap.org/img/wn/" + iconId + ".png"
    console.log(iconUrl);
    // display city, date, icon
    var todaySection = document.getElementById("today");
    var headerToday = document.createElement("h2");
    var iconImg = document.createElement("img");
    iconImg.setAttribute("src", iconUrl);
    iconImg.setAttribute("alt", "weather-icon");
    headerToday.textContent = `${cityName} (${currentDate})`;
    todaySection.appendChild(headerToday);
    headerToday.appendChild(iconImg);
    
    console.log(headerToday);

    // retrieving temp
    var temp = (data.list[0].main.temp - 273.15).toFixed(2);
    console.log(temp);
    // retrieving wind
    var wind = data.list[0].wind.speed;
    console.log(wind);
    // retrieving humidity
    var humidity = data.list[0].main.humidity;
    console.log(humidity);
  
});

// Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name? 
// Geocoding API



function fetchCoord(cityInput) {
    var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=5&appid=" + apiKey;

    fetch (geoUrl)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        // console.log(data)
        // retrieving city name
        var cityNameGeo = data[0].name;
        console.log(cityNameGeo);

        // retrieving coord
        var cityLat = data[0].lat;
        var cityLon = data[0].lon;
        console.log(cityLat);
        console.log(cityLon);

});

}

var cityInput = "London";
fetchCoord(cityInput);
