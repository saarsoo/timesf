function request(options){
    options = options || {};
    options.async = options.async || true;
    options.headers = options.headers || {};

    var http = new XMLHttpRequest();
    http.open(method, url, async);

    for (var name in options.header) {
        if (options.header.hasOwnProperty(name)) {
            http.setRequestHeader(name, options.header[name]);
        }
    }

    http.onreadystatechange = function(){
        if (http.readyState == 4) {
            if (http.status == 200 || http.status == 302) {
                if (options.success) {
                    options.success();
                }
            } else {
                if (options.error) {
                    options.error();
                }
            }
        }
    }

    http.send(options.data);
}

function get(url, success){
    request({
                method: "GET",
                url: url,
                success: success
            });
}

function post(url, data, success) {
    request({
                url: url,
                data: data,
                success: success
            });
}
