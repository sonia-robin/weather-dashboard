var apiKey = "f2d3f1b582a7074aba258738949ac0ae";
var lat = 51.5073219;
var lon = -0.1276474;

// function to fetch and display current forecast data
function fetchForecastToday (coordUrlSection){

var apiCall = "http://api.openweathermap.org/data/2.5/forecast?" + coordUrlSection + "&appid=" + apiKey;
var currentDate = dayjs().format("DD/MM/YYYY");

console.log(apiCall);

fetch (apiCall)
.then(function (response){
    return response.json();
})
.then(function (data){
    var todaySection = document.getElementById("today");
    // empty today section first
    todaySection.innerHTML = "";
    // retrieving city name
    var cityName = data.city.name;

    // retrieving date today
    var date = data.list[0].dt_txt;
    
    // retrieving weather icon ID + build icon URL
    var iconId = data.list[0].weather[0].icon;
    var iconUrl =  "https://openweathermap.org/img/wn/" + iconId + ".png"
    
    // display city, date, icon in today section
    var headerToday = document.createElement("h2");
    var iconImg = document.createElement("img");
    iconImg.setAttribute("src", iconUrl);
    iconImg.setAttribute("alt", "weather-icon");
    headerToday.textContent = `${cityName} (${currentDate})`;
    todaySection.appendChild(headerToday);
    headerToday.appendChild(iconImg);

    // retrieve and display temp converted do Celsius, rounded to 2 decimals
    var temp = (data.list[0].main.temp - 273.15).toFixed(2);
    var tempEl = document.createElement("p");
    tempEl.textContent = `Temp: ${temp}°C`;
    todaySection.appendChild(tempEl);
   
    // retrieve and display wind
    var wind = data.list[0].wind.speed;
    var windEl = document.createElement("p");
    windEl.textContent = `Wind: ${wind} KPH`;
    todaySection.appendChild(windEl);
    
    // retrieve and display humidity
    var humidity = data.list[0].main.humidity;
    var humidityEl = document.createElement("p");
    humidityEl.textContent = `Humidity: ${humidity}%`;
    todaySection.appendChild(humidityEl);

    // console logs
    console.log(data);
    console.log(cityName);
    console.log(date);
    console.log(iconId);
    console.log(iconUrl);
    console.log(headerToday);
    console.log(temp);
    console.log(wind);
    console.log(humidity);

    for (var i = 0; i < data.list.length; i++){
        var dateHour = data.list[i].dt_txt;
        var midday = dateHour.includes("12");
        if (midday){
            console.log(dateHour);
        }
    }
  
});
}

// function to display 5 day forecast
// function fetchForecastFiveDays (coordUrlSection){
//     var apiCall = "http://api.openweathermap.org/data/2.5/forecast?" + coordUrlSection + "&appid=" + apiKey;
//     fetch (apiCall)
//     .then(function (response){
//         return response.json();
//     })
//     .then(function (data){
//         var todaySection = document.getElementById("today");
//         // empty today section first
//         todaySection.innerHTML = "";
//         for (var i = 0; i < data.list; i++){
//             var dateHour = data.list[i].dt_txt;
//             console.log(dateHour);
//         }

// });
// }

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
        var coordUrlSection = "lat=" + cityLat + "&lon=" + cityLon
        console.log(cityLat);
        console.log(cityLon);
        console.log(coordUrlSection);

        fetchForecastToday(coordUrlSection);
        // fetchForecastFiveDays (coordUrlSection);
    }); 
}

// add event listener to search button
var searchBtn = document.getElementById("search-button");
searchBtn.addEventListener("click", function(e){
    e.preventDefault();
    var cityInput = document.getElementById("search-input").value.trim();
    fetchCoord(cityInput);
})

