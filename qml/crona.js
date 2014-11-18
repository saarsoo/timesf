.import 'ajax.js' as Ajax
.import QtQuick.LocalStorage 2.0 as LS

var sid;
var userId;
var pin;
var baseUrl;

function clockIn(success, error) {
    tryLogin(function(){
        // clock in code here!
    }, error);
}

function clockOut(success, error){
    tryLogin(function(){
        // clock out code here!
    }, error);
}

function getLogs(success, error) {
    tryLogin(function(){
        var options = {
            method: 'GET',
            url: baseUrl + 'webbtidur/?cmd=getstamplistxml&kortnr=' + userId + '&sid=' + sid + '&uid=' + new Date().getTime(),
            headers: {Cookie: 'crona_cbo_login_value_1=true;', accept: 'application/json'},
            success: function(data){
                success(formatLogs(data));
            },
            error: error
        };

        Ajax.request(options);
    }, error);
}

function formatLogs(data) {
    return JSON.parse(data);

    /*var regex = /\d+ \w+ (\d{2}:\d{2}) (\w{2})/g;
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
    }*/
}

function tryLogin(success, error){
    if (sid) {
        success();
    }

    var options = {
        method: 'POST',
        data: 'cmd=login&kortnr=' + userId + '&pinkod=' + pin + '&frm_forw=Logga+in',
        success: function(data, status, xhr){
            var headers = xhr.getAllResponseHeaders();
            var loc = http.getResponseHeader('Location');
            sid = loc.split('=')[1];

            success();
        },
        error: function(data, status){
            error(qsTr('Failed to connect to crona server'));
        }
    };

    Ajax.request(options);
}
