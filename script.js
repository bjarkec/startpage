Number.prototype.pad = function(n) {
  for (var r = this.toString(); r.length < n; r = 0 + r);
  return r;
};
function updateClock() {
  var now = new Date();
  var min = now.getMinutes(),
    hou = now.getHours();
  var tags = ["h", "m"],
    corr = [hou.pad(2), min.pad(2)];
  for (var i = 0; i < tags.length; i++)
    document.getElementById(tags[i]).firstChild.nodeValue = corr[i];
}
function initClock() {
  updateClock();
  window.setInterval("updateClock()", 1000);
}

document.body.style.background = localStorage.getItem("background");

$(document).keyup(function(e) {
     if (e.key === "Escape") { // escape key maps to keycode `27`
        var hex = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		document.body.style.background = hex;
		localStorage.setItem('background', hex);
    } else if (e.key === "Insert") { 
		document.body.style.background = "#202124";
		localStorage.setItem('background', "#202124");
    }
});
