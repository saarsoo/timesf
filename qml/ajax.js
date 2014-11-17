function get(url, callback, options){
    var http = new XMLHttpRequest();
    http.open("GET", url, true);

    if (options) {
        if (options.header) {
            for (var name in options.header) {
                if (options.header.hasOwnProperty(name)){
                    http.setRequestHeader(name, options.header[name]);
                }
            }
        }
    }

    http.onreadystatechange = function() {
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

function post(url, params, callback) {
    var http = new XMLHttpRequest();
    http.open("POST", url, true);

    http.onreadystatechange = function() {
        if (http.readyState == 4) {
            callback(http.responseText, http);
        }
    }

    http.send(params);
}
