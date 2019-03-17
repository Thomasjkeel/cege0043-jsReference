var client;
var formclient;
var earthquakes;
var earthquakelayer;


function addPointLinePoly() {
  L.marker([51.5, -0.09]).addTo(mymap)
          .bindPopup("<b>Hello World!</br><br />I am a popup.").openPopup();

  var pointA = new L.LatLng(51.635308, 0.22496);
  var pointB = new L.LatLng(51.984461, 0.70641);
  var pointList = [pointA, pointB];

  var firstpolyline = new L.polyline(pointList, {
    color: 'red',
    weight: 3,
    opacity: 0.5,
    smoothFactor: 1
    })
    firstpolyline.addTo(mymap);

  var myPolygon = L.polygon([
          [51.509, -0.08],
          [51.503, -0.06],
          [51.51, -0.047]
  ],{
          color:'red',
          fillColor:'#f03',
          fillOpacity:0.5
    }).addTo(mymap).bindPopup("I am a polygon.");
}


function getFormData() {
    formclient = new XMLHttpRequest();
    // make client request
    console.log(httpPortNumber);
    var url = 'http://developer.cege.ucl.ac.uk:' + httpPortNumber + '/getFormData/' + httpPortNumber;
    formclient.open('GET', url, true);
    formclient.onreadystatechange = formResponse;
    formclient.send();
}

function formResponse() {
    if (formclient.readyState == 4) {
        console.log(formclient.responseText)
        document.getElementById("uploadedFormResults").innerHTML = formclient.responseText;
    }
}

function getEarthquakes() {
    client = new XMLHttpRequest();
    // make client request
    client.open('GET', 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson');
    client.onreadystatechange = earthquakeResponse; // earthquakeRepsonse is a method
    client.send();
}
// create code to wait for response from the server and process it when recieved
function earthquakeResponse() {
    // listener
    if (client.readyState == 4) {
        var earthquakedata = client.responseText;
        loadEarthquakelayer(earthquakedata);
    }
}

// convert the received data - which is text - to JSON format and add it to the map
function loadEarthquakelayer(earthquakedata)
{
    // parse the response to JSON
    var earthquakejson = JSON.parse(earthquakedata);
    earthquakes = earthquakejson;
    // add to map with markers
    earthquakelayer = L.geoJson(earthquakejson,
    {
        pointToLayer: function(feature, latlng)
        {
            //colored custom marker based on magnitude
            if (feature.properties.mag > 1.75) {
                // alert("Nice!") for testing
                 return L.marker(latlng).bindPopup("<b>"+feature.properties.place+"</b>");
            } else {
                // alert("ALSO Nice!") for testing
                return L.marker(latlng).bindPopup("<b>"+feature.properties.place+"</b>");
            }
        },
    }).addTo(mymap);
    // re-fit the bounds
    mymap.fitBounds(earthquakelayer.getBounds());
}
