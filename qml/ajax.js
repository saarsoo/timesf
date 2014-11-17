function get(url, callback){
    var http = new XMLHttpRequest();
    http.open("GET", url, true);

    // Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.setRequestHeader("Connection", "close");

    http.onreadystatechange = function() { // Call a function when the state changes.
        if (http.readyState == 4) {
            if (http.status == 200) {
                callback(http.responseText);
            } else {
                console.log("error: " + http.status);
            }
        }
    }

    http.send();
}
