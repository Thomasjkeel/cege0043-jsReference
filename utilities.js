var httpPortNumber;
var httpsPortNumber;

function getPort() {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function () {
    var parser = new DOMParser();
    var doc = parser.parseFromString(xhr.responseText, "application/xml");
    httpPortNumber = doc.getElementByTagName("node-port-http").item(0).textContent;
    httpsPortNumber = doc.getElementByTagName("node-port-https").item(0).textContent;
    alert("Port : " + httpPortNumber);
  })

  // depending on whethere we are on browser or phone
  // the location of the config file is different
  // if we are on a phone then http and https won't be present
  var configLocation = "res/port.xml";
  xhr.open("get", configLocation, true);
  xhr.send();
}
