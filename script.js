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

