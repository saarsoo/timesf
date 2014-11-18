function request(options){
    options = options || {};
    options.async = options.async || true;
    options.headers = options.headers || {};
    options.method = options.method || 'GET';

    var xhr = new XMLHttpRequest();
    xhr.open(options.method, options.url, options.async);

    for (var name in options.header) {
        if (options.header.hasOwnProperty(name)) {
            xhr.setRequestHeader(name, options.header[name]);
        }
    }

    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 302) {
                if (options.success) {
                    options.success(http.responseText);
                }
            } else {
                if (options.error) {
                    options.error(http.responseText);
                }
            }
        }
    }

    xhr.send(options.data);

    return xhr;
}

function get(url, success){
    request({
                method: 'GET',
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
