function loadW3HTML() {
  w3.includeHTML();
}

function trackAndCircle() {
  trackLocation();
  addPointLinePoly();
  // getEarthquakes();
  getFormData();
  loadW3HTML();
  // NB: all javascript when the webpage is loaded
}

function startup() {
  document.addEventListener('DOMContentLoaded', function() {
    getPort(() => trackAndCircle());
  }, false);
}