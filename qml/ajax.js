function request(options){
    options = options || {};
    options.headers = options.headers || {};
    options.method = options.method || 'GET';
    options.data = options.data || {};

    if (options.method === 'GET') {
        var params = '';
        for (var key in options.data) {
            if (options.data.hasOwnProperty(key)) {
                params += key + '=' + JSON.stringify(options.data[key]);
            }
        }

        if (params) {
            options.url = options.url + '?' + params;
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.open(options.method, options.url, true);

    for (var name in options.header) {
        if (options.header.hasOwnProperty(name)) {
            xhr.setRequestHeader(name, options.header[name]);
        }
    }

    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 302) {
                if (options.success) {
                    options.success(xhr.responseText, xhr.status, xhr);
                }
            } else {
                if (options.error) {
                    options.error(xhr.responseText, xhr.status, xhr);
                }
            }
        }
    }

    if (options.method === 'GET') {
        xhr.send();
    } else {
        xhr.send(options.data);
    }

    return xhr;
}
function get(url, success){
    return request({
                       method: 'GET',
                       url: url,
                       success: success
                   });
}

function post(url, data, success) {
    return request({
                       url: url,
                       data: data,
                       success: success
                   });
}
