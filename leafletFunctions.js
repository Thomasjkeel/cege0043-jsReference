var client;
var formclient;
var formLayer;
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
    console.log("current port number", httpPortNumber);
    var url = 'http://developer.cege.ucl.ac.uk:' + httpPortNumber
    //  + '/getFormData/' + httpPortNumber;
    url = url + '/getGeoJSON/formdata/geom/' + httpPortNumber;
    console.log(url);
    formclient.open('GET', url, true);
    formclient.onreadystatechange = formResponse;
    formclient.send();
}

function formResponse() {
    if (formclient.readyState == 4) {
        // console.log(formclient.responseText)
        var formData = formclient.responseText;
        loadFormData(formData);
        // document.getElementById("ajaxtest").innerHTML = formclient.responseText;
    }
}

function loadFormData(formData) {
    // convert the text received from the server to JSON
    console.log(formData);
    var formJSON = JSON.parse(formData);
    // load the geoJSON layer
    formLayer = L.geoJson(formJSON, {
        // use point to layer to create the points
        pointToLayer: function (feature, latlng) {
            // in this case, we build an HTML DIV string
            // using the values in the data
            var htmlString = "<DIV id='popup'" + feature.properties.id + "><h2>" + feature.properties.name + "</h2><br>";
                htmlString = htmlString + "<h3>" + feature.properties.surname + "</h3><br>";
                htmlString = htmlString + "<input type='radio' name='answer' id = '"+feature.properties.id+"_1' / > "+feature.properties.module+" < br > ";
                htmlString = htmlString + "<input type='radio' name='answer' id = '"+feature.properties.id+"_2' / > "+feature.properties.language+" < br > ";
                htmlString = htmlString + "<input type='radio' name='answer' id = '"+feature.properties.id+"_3' / > "+feature.properties.lecturetime+" < br > ";
                htmlString = htmlString + "<input type='radio' name='answer' id = '"+feature.properties.id+"_4' / > "+feature.properties.port_id+" < br > ";
                htmlString = htmlString + "<button onclick='checkAnswer(" + feature.properties.id + ");return false;'>Submit Answer</button>";
            // now include a hidden element with the answer
            // in this case the answer is alwasy the first choice
            // for the assignment this will of course vary - you can use feature.properties.correct_answer
            htmlString = htmlString + "<div id=answer" + feature.properties.id + " hidden>1</div>";
            htmlString = htmlString + "</div>";
            return L.marker(latlng).bindPopup(htmlString);
        },
    }).addTo(mymap);
    mymap.fitBounds(formLayer.getBounds());
}

function checkAnswer(questionID) {
   // get the answer from the hidden div
   // NB - do this BEFORE you close the pop-up as when you close the pop-up the DIV is destroyed
   var answer = document.getElementById("answer" + questionID).innerHTML;
   // now check the question radio buttons
   var correctAnswer = false;
   var answerSelected = 0;
   for (var i = 1; i < 5; i++) {
       if (document.getElementById(questionID + "_" + i).checked) {
           answerSelected = i;
       }
       if ((document.getElementById(questionID + "_" + i).checked) && (i == answer)) {
           alert("Well done");
           correctAnswer = true;
        }
    }
    if (correctAnswer === false) {
        // they didn't get it right
        alert("Better luck next time");
    }
    // now close the popup
    mymap.closePopup();
    // the code to upload the answer to the server would go here
    // call an AJAX routine using the data
    // the answerSelected variable holds the number of the answer
    //that the user picked
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
