const enginesList	= getJson("enginesList.json"),
	  searchbox		= document.getElementById("search"),
	  urlRegex		= /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

//On `Enter` key press, do search
searchbox.addEventListener("keydown", function(e) {
	e.keyCode === 13 ? search() : false;
});

function search() {
	var query = searchbox.value;
	
	//Detect engine (eg.: "!yt vsauce" -> "youtube.com/results?search_query=vsauce")
	var engine = "";
	var firstWord = searchbox.value.split(' ')[0];

	if (firstWord[0] === '!') { //If first character is '!'
		//Select engine based on flag
		engine = enginesList[firstWord];

		//Delete flag
		query = query.split(' ');
		query.shift();
	}
	else if (query.match(urlRegex)) { //If input is a URL
		//If it already has `http(s)://`, don't prefix anything
		//Otherwise, add `http://` prefix
		engine = (query.indexOf("http") === 0 ? "" : "http://");
	}
	else {
		//Use search engine listed in `enginesList.json`
		engine = enginesList["search"];
	}

	var query_url = engine + query;

	//Prevent empty searches
	//If `query` string isn't blank, go to `query_url`
	query ? window.location.href = query_url : false;
}

function getJson(file) {
	var req = new XMLHttpRequest();
	req.open('GET', file, false);

	req.send();

	if (req.status == 200) {
		if (req.response != undefined) {
			return JSON.parse(req.response);
		}
	}
	else if (req.status == 404) {
		alert("Bangs will not work");
	}
}
