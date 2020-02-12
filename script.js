Number.prototype.pad = function (n) {
	for (var r = this.toString(); r.length < n; r = 0 + r);
	return r;
};

function updateClock() {
	var now = new Date(); // Creating a variable called "now" and assigning it to the current time
	var min = now.getMinutes() // Assigning the variable "min" to the current minutes
	var hou = now.getHours(); // Assigning the variable "hou" to the current hours
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
	var xmlhttp = new XMLHttpRequest(); // Defines the XMLHttpRequest variable
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var weather = JSON.parse(this.responseText);
			document.getElementById("cityName").innerHTML = weather.name; // Gets the name of the city

			document.getElementById("currentTemp").innerHTML = "Current temperature: " + weather.main.temp + " °C"; // Gets the current temperature
			document.getElementById("currentTempFeelsLike").innerHTML = "Feels like: " + weather.main.feels_like + " °C"; // Gets the current feels like temperature
			document.getElementById("pressure").innerHTML = "Pressure: " + weather.main.pressure + " hPa"; // Gets the current pressure
			document.getElementById("humidity").innerHTML = "Humidity: " + weather.main.humidity + " %"; // Gets the current humidity

			document.getElementById("windSpeed").innerHTML = "Wind speed: " + weather.wind.speed + " m/s"; // Gets the current wind speed
			document.getElementById("windDegrees").innerHTML = "Wind direction: " + weather.wind.deg + "°"; // Gets the current wind direction

			document.getElementById("cloudCover").innerHTML = "Cloud cover: " + weather.clouds.all + " %"; // Gets the current cloudcover
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