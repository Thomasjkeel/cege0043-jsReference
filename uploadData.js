function startDataUpload() {
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var modulename = document.getElementById("module").value;
    var postString = "name=" + name + "&surname=" + surname + "&module=" + modulename;
    var checkString = "";
    for (var i = 1; i < 5; i++){
        if (document.getElementById("check"+i).checked === true) {
            checkString = checkString + document.getElementById("check"+i).value + "||"
        }
    }
    var postString = postString + "&modulelist=" + checkString;

    if (document.getElementById("morning").checked) {
        postString = postString + "&lecturetime=morning";
    } if (document.getElementById("afternoon").checked) {
        postString = postString + "&lecturetime=afternoon";
    }
    // now get check boxes
    var language = document.getElementById("languageselectbox").value;
    postString = postString + "&language=" + language;
    var latitude = document.getElementById("latitude").value;
    var longitude = document.getElementById("longitude").value;
    postString = postString + "&latitude=" + latitude + "&longitude=" + longitude;
    processData(postString);
}

var client;
function processData(postString) {
    client = new XMLHttpRequest();
    client.open('POST', 'http://developer.cege.ucl.ac.uk:30285/reflectData',true);
    client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    client.onreadystatechange = dataUploaded;
    client.send(postString);
}

function dataUploaded() {
    // listens out for the response
    if (client.readyState == 4) {
        document.getElementById("dataUploadResult").innerHTML = client.responseText;
    }
}