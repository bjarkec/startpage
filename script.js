Number.prototype.pad = function (n) {
	for (var r = this.toString(); r.length < n; r = 0 + r);
	return r;
};

function updateClock() {
	var now = new Date(); // Creating a variable called "now" and assigning it to the current time
	var min = now.getMinutes(); // Assigning the variable "min" to the current minutes
	var hou = now.getHours() + 2; // Assigning the variable "hou" to the current hours
	var tags = ["h", "m"]; // Defining the tags that will be shown on screen
	var corr = [hou.pad(2), min.pad(2)];
	for (var i = 0; i < tags.length; i++)
		document.getElementById(tags[i]).firstChild.nodeValue = corr[i];
}

function updateDate() {
	var now = new Date(); // Creating a variable called "now" and assigning it to the current time
	var day = now.getUTCDate() // Assigning the variable "day" to the current day
	var month = now.getUTCMonth() + 1; // Assigning the variable "month" to the current month (the +1 is needed, as the value of January is 0)
	var year = now.getUTCFullYear(); // Assigning the variable "year" to the current year
	var tagsdate = ["day", "month", "year"]; // Defining the tags that will be shown on screen
	var corrdate = [day.pad(2), month.pad(2), year.pad(4)];
	for (var i = 0; i < tagsdate.length; i++)
		document.getElementById(tagsdate[i]).firstChild.nodeValue = corrdate[i];
}


function updateWeather() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var weather = JSON.parse(this.responseText);

			var recievedTime = weather.dt * 1000;

			var recievedDate = new Date();

			recievedDate.setTime(recievedTime);

			var recievedHours = recievedDate.getHours() + 2;

			document.getElementById("recievedTime").innerHTML = "Data recieved: " + recievedHours.pad(2) + "." + recievedDate.getMinutes().pad(2); // Gets the time of the recieved weather report

			document.getElementById("cityName").innerHTML = weather.name; // Gets the name of the city

			var weatherIcon = weather.weather[0].icon;

			var weatherIconPicture = "icons/weathericons/" + weatherIcon + ".png";

			document.getElementById("weatherIcon").src = weatherIconPicture;

			document.getElementById("weatherDescription").innerHTML = weather.weather[0].main;

			document.getElementById("currentTemp").innerHTML = "Current temperature: " + weather.main.temp + " °C"; // Gets the current temperature
			document.getElementById("currentTempFeelsLike").innerHTML = "Feels like: " + weather.main.feels_like + " °C"; // Gets the current feels like temperature
			document.getElementById("pressure").innerHTML = "Pressure: " + weather.main.pressure + " hPa"; // Gets the current pressure
			document.getElementById("humidity").innerHTML = "Humidity: " + weather.main.humidity + " %"; // Gets the current humidity
			
			var windDeg = weather.wind.deg;

			var windDirection;

			if (windDeg > 349 || windDeg <= 11) {
				windDirection = "N";
			} else if (windDeg > 11 && windDeg <= 34) {
				windDirection = "NNE";
			} else if (windDeg > 34 && windDeg <= 56) {
				windDirection = "NE";
			} else if (windDeg > 56 && windDeg <= 79) {
				windDirection = "ENE";
			} else if (windDeg > 79 && windDeg <= 101) {
				windDirection = "E";
			} else if (windDeg > 101 && windDeg <= 124) {
				windDirection = "ESE";
			} else if (windDeg > 124 && windDeg <= 146) {
				windDirection = "SE";
			} else if (windDeg > 146 && windDeg <= 169) {
				windDirection = "SSE";
			} else if (windDeg > 169 && windDeg <= 191) {
				windDirection = "S";
			} else if (windDeg > 191 && windDeg <= 214) {
				windDirection = "SSW";
			} else if (windDeg > 214 && windDeg <= 236) {
				windDirection = "SW";
			} else if (windDeg > 236 && windDeg <= 259) {
				windDirection = "WSW";
			} else if (windDeg > 259 && windDeg <= 281) {
				windDirection = "W";
			} else if (windDeg > 281 && windDeg <= 304) {
				windDirection = "WNW";
			} else if (windDeg > 304 && windDeg <= 326) {
				windDirection = "NW";
			} else if (windDeg > 326 && windDeg <= 349) {
				windDirection = "NNW";
			}

			document.getElementById("wind").innerHTML = "Wind: " + windDirection + " at " + weather.wind.speed + " m/s"; // Gets the current wind speed and wind direction

			document.getElementById("cloudCover").innerHTML = "Cloud cover: " + weather.clouds.all + " %"; // Gets the current cloudcover

			var sunriseTime = weather.sys.sunrise * 1000;

			var sunriseDate = new Date();

			sunriseDate.setTime(sunriseTime);

			var sunriseHours = sunriseDate.getHours() + 2;

			document.getElementById("sunrise").innerHTML = "Sunrise: " + sunriseHours.pad(2) + "." + sunriseDate.getMinutes().pad(2) + "." + sunriseDate.getSeconds().pad(2); // Gets the time of sunrise

			var sunsetTime = weather.sys.sunset * 1000;

			var sunsetDate = new Date();

			sunsetDate.setTime(sunsetTime);

			var sunsetHours = sunsetDate.getHours() + 2;

			document.getElementById("sunset").innerHTML = "Sunset: " + sunsetHours.pad(2) + "." + sunsetDate.getMinutes().pad(2) + "." + sunsetDate.getSeconds().pad(2); // Gets the time of sunset
		}
	};
	xmlhttp.open("GET", "https://api.openweathermap.org/data/2.5/weather?id=2620141&units=metric&appid=4b05e8a2581714c237716a9502fe0d24&lang=da", true);
	xmlhttp.send();
}

function init() { // Runs at initialisation of the website
	updateDate(); // Updates the date
	updateClock(); // Updates the clock
	updateWeather(); // Updates the weather
	window.setInterval("updateClock()", 1000); // Updates the clock every second
	window.setInterval("updateWeather()", 600000); // Updates the weather every 10 minutes
}

document.body.style.background = localStorage.getItem("background");