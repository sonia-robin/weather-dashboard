var apiKey = "f2d3f1b582a7074aba258738949ac0ae";
var lat = 51.5073219;
var lon = -0.1276474;

// function to fetch and display forecast data
function fetchWeatherForecast (coordUrlSection){
var apiCall = "http://api.openweathermap.org/data/2.5/forecast?" + coordUrlSection + "&appid=" + apiKey;
var currentDate = dayjs().format("DD/MM/YYYY");

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
    document.getElementById("today").style.border = "1px solid black";
    document.getElementById("today").style.padding = "10px";
    document.getElementById("today").style.borderRadius = "5px";
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
    // forecast section
    var forecastSection = document.getElementById("forecast");
    // empty section first
    forecastSection.innerHTML = "";
    for (var i = 0; i < data.list.length; i++){
        var dateHour = data.list[i].dt_txt;
        var midday = dateHour.includes("12");
        // retrieving weather icon ID + build icon URL
        var iconId = data.list[i].weather[0].icon;
        var iconUrl =  "https://openweathermap.org/img/wn/" + iconId + ".png"
        // render cards only for midday
        if (midday){
            var year = dateHour.slice(0,4);
            var month = dateHour.slice(5,7)-1; //daysjs indexes months starting from 0
            var day = dateHour.slice(8,10);
            var dateObj = new Date(year, month, day);
            var date = dayjs(dateObj).format("DD/MM/YYYY");
            var colDiv = document.createElement("div");
            colDiv.setAttribute("class", "col");
            forecastSection.appendChild(colDiv);
            var cardDiv = document.createElement("div");
            cardDiv.setAttribute("class", "card bootsrap-card");
            colDiv.appendChild(cardDiv);
            var cardBody = document.createElement("div");
            cardBody.setAttribute("class", "card-body");
            cardDiv.append(cardBody);
            var cardTitle = document.createElement("h6");
            cardTitle.setAttribute("class", "card-title");
            cardTitle.textContent = date;
            cardBody.appendChild(cardTitle);
            var iconImg = document.createElement("img");
            iconImg.setAttribute("src", iconUrl);
            iconImg.setAttribute("alt", "weather-icon");
            cardBody.appendChild(iconImg)
            var temp = (data.list[i].main.temp - 273.15).toFixed(2);
            var tempEl = document.createElement("p");
            tempEl.textContent = `Temp: ${temp}°C`;
            cardBody.appendChild(tempEl);
            var wind = data.list[i].wind.speed;
            var windEl = document.createElement("p");
            windEl.textContent = `Wind: ${wind} KPH`;
            cardBody.appendChild(windEl);
            var humidity = data.list[i].main.humidity;
            var humidityEl = document.createElement("p");
            humidityEl.textContent = `Humidity: ${humidity}%`;
            cardBody.appendChild(humidityEl);
        }
    }  
});
}

// Retrieve geographical coordinates given a city name using Geocoding API, call fetchWeatherForecast
function fetchCoord(cityInput) {
    var geoUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=5&appid=" + apiKey;

    fetch (geoUrl)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        var cityLat = data[0].lat;
        var cityLon = data[0].lon;
        var coordUrlSection = "lat=" + cityLat + "&lon=" + cityLon
        fetchWeatherForecast(coordUrlSection);
    }); 
}

// add event listener to search button
var searchBtn = document.getElementById("search-button");
searchBtn.addEventListener("click", function(e){
    var cityInput = document.getElementById("search-input").value.trim();
    e.preventDefault();
    fetchCoord(cityInput);
    saveToStorage(cityInput);
    renderSearchHistory();
})

// function save to local storage
function saveToStorage (cityInputValue) {
    localStorage.setItem("searchInput", cityInputValue);
}

// function render search hisotry buttons and results
function renderSearchHistory () {
    var savedCitySearch = localStorage.getItem("searchInput");
    var history = document.getElementById("history");
    var historyButton = document.createElement("button");
    historyButton.setAttribute("type", "button");
    historyButton.setAttribute("class", "btn btn-primary history-btn");
    historyButton.innerHTML = savedCitySearch;
    history.prepend(historyButton);
    historyButton.addEventListener("click", function(e){
        var cityInput = historyButton.innerHTML;
        e.preventDefault();
        fetchCoord(cityInput);
    })
}