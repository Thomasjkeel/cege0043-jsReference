function trackAndCircle() {
  trackLocation();
  addPointLinePoly();
  getEarthquakes();
  // NB: all javascript when the webpage is loaded
}

function startup() {
  document.addEventListener('DOMContentLoaded', function() {
    trackAndCircle ();
  }, false);
}
