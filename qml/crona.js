.import 'ajax.js' as Ajax
.import 'database.js' as DB

var settings;

function clockIn(success, error) {
    getLogs(function(logs){
        if (logs.length > 0) {
            var lastLog = logs[0];
            if (lastLog.type === 'IN') {
                error(qsTr('Already in!'));
                return;
            }
        }

        success();

        /*var options = {
            method: 'GET',
            url: settings.url + '/webbtidur/?cmd=stampla&event=in&anstnr=' + settings.userId + '&sid=' + settings.sid + '&uid=' + new Date().getTime(),
            headers: {Cookie: 'crona_cbo_login_value_1=true;'},
            success: success,
            error: error
        };

        Ajax.request(options);*/
    }, error);
}

function clockOut(success, error){
    getLogs(function(logs){
        if (logs.length > 0) {
            var lastLog = logs[0];
            if (lastLog.type === 'OUT') {
                error(qsTr('Already out!'));
                return;
            }
        }

        success();

        /*var options = {
            method: 'GET',
            url: settings.url + '/webbtidur/?cmd=stampla&event=ut&anstnr=' + settings.userId + '&sid=' + settings.sid + '&uid=' + new Date().getTime(),
            headers: {Cookie: 'crona_cbo_login_value_1=true;'},
            success: success,
            error: error
        };

        Ajax.request(options);*/
    }, error);
}

function getLogs(success, error) {
    tryLogin(function(){
        var options = {
            method: 'GET',
            url: settings.url + '/webbtidur/?cmd=getstamplistxml&kortnr=' + settings.userId + '&sid=' + settings.sid + '&uid=' + new Date().getTime(),
            headers: {Cookie: 'crona_cbo_login_value_1=true;'},
            success: function(data){
                success(formatLogs(data));
            },
            error: error
        };

        Ajax.request(options);
    }, error);
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
        logs.push(log);
    }

    return logs;
}

function tryLogin(success, error){
    settings = DB.getSettings();

    if (settings.sid) {
        success();
        return;
    }

    var options = {
        url: settings.url,
        method: 'POST',
        data: 'cmd=login&kortnr=' + settings.userId + '&pinkod=' + settings.pin + '&frm_forw=Logga+in',
        success: function(data, status, xhr){
            var headers = xhr.getAllResponseHeaders();
            var loc = xhr.getResponseHeader('Location');
            settings.sid = loc.split('=')[1];
            DB.saveSid(settings.sid);

            success();
        },
        error: function(data, status){
            error(qsTr('Failed to connect to crona server'));
        }
    };

    Ajax.request(options);
}
