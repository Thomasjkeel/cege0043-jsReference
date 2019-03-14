var xhrNode;

function callDivNodeJSChange() {
    xhrNode = new XMLHttpRequest();
    var filename = document.getElementById("filename").value;
    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber;
    // console.log("port number ==", httpPortNumber);
    console.log(url + '/' + filename);
    xhrNode.open("GET", url + '/' + filename, true);
    xhrNode.onreadystatechange = processDivNodeJSChange;
    xhrNode.send();
}

function processDivNodeJSChange() {
    if (xhrNode.readyState < 4) {
        document.getElementById('ajaxtest').innerHTML = "Loading...";
    } else if (xhrNode.readyState === 4) {
        if (xhrNode.status == 200 && xhrNode.status < 300) {
            document.getElementById('ajaxtest').innerHTML = xhrNode.responseText;
        }
    }
}