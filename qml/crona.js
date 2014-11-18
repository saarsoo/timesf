.import 'ajax.js' as Ajax
.import QtQuick.LocalStorage 2.0 as LS

var sid;
var userId;
var pin;
var baseUrl;

function logIn(callback) {
    Ajax.get('http://google.se', function(data){
        callback(data);
    });
}

function logOut(callback){
    Ajax.get('http://google.se', function(data){
        callback(data);
    });
}

function getLogs(callback) {
    return [{type: 'IN', time: '08:22'}, {type: 'OUT', time: '11:44'}, {type: 'IN', time: '18:10'}];

    checkLoggedIn();

    var options = {
        method: 'GET',
        url: baseUrl + 'webbtidur/?cmd=getstamplistxml&kortnr=' + userId + '&sid=' + sid + '&uid=' + new Date().getTime(),
        headers: {Cookie: 'crona_cbo_login_value_1=true;'}
    };

    var xhr = Ajax.request(options);

    return formatLogs(xhr.responseText);
}

function formatLogs(data) {
    var regex = /\d+ \w+ (\d{2}:\d{2}) (\w{2})/g;
    var match;

    var logs = [];

    while ((match = regex.exec(data)) != null) {
        var log = {};

        log.time = match[1];
        log.type = match[2];
        if (log.type === 'UT') {
            log.type = 'OUT';
        }
        logs.push(item);
    }
}

function checkLoggedIn(){
    if (sid) {
        return;
    }

    var options = {
        method: 'POST',
        data: 'cmd=login&kortnr=' + userId + '&pinkod=' + pin + '&frm_forw=Logga+in'
    };

    var xhr = Ajax.request(options);
    var headers = xhr.getAllResponseHeaders();

    var loc = http.getResponseHeader('Location');
    sid = loc.split('=')[1];
}
