Number.prototype.pad = function (n) {
	for (var r = this.toString(); r.length < n; r = 0 + r);
	return r;
};

function updateClock() {
  var now = new Date();
	var min = now.getMinutes()
	var hou = now.getHours();
	var tags = ["h", "m"];
	var corr = [hou.pad(2), min.pad(2)];
	for (var i = 0; i < tags.length; i++)
		document.getElementById(tags[i]).firstChild.nodeValue = corr[i];
}

function updateDate() {
	var now = new Date();
	var day = now.getUTCDate()
	var month = now.getUTCMonth()+1;
	var year = now.getUTCFullYear();
	var tagsdate = ["day", "month", "year"];
	var corrdate = [day.pad(2), month.pad(2), year.pad(4)];
	for (var i = 0; i < tagsdate.length; i++)
		document.getElementById(tagsdate[i]).firstChild.nodeValue = corrdate[i];
}

function initClock() {
  	updateDate();
	updateClock();
	window.setInterval("updateClock()", 1000);
}

document.body.style.background = localStorage.getItem("background");