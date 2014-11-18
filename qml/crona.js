.import "ajax.js" as Ajax
.import QtQuick.LocalStorage 2.0 as LS

var sid;
var userId;
var pin;
var baseUrl;

function logIn(callback) {
    Ajax.get("http://google.se", function(data){
        callback(data);
    });
}

function logOut(callback){
    Ajax.get("http://google.se", function(data){
        callback(data);
    });
}

function getLogs(callback) {
    callback([{type: "IN", time: "08:22"}, {type: "OUT", time: "11:44"}, {type: "IN", time: "18:10"}]);
    return;

    login(function(){
        var url = baseUrl + "webbtidur/?cmd=getstamplistxml&kortnr=" + userId + "&sid=" + sid + "&uid=" + new Date().getTime();

        Ajax.get(url, function(data){
            var regex = /\d+ \w+ (\d{2}:\d{2}) (\w{2})/g;
            var match;

            var items = [];

            while ((match = regex.exec(data)) != null) {
                var item = {};

                item.time = match[1];
                item.type = match[2];
                if (item.type === "UT") {
                    item.type = "OUT";
                }
                items.push(item);
            }

            callback(items);

        }, {header: {Cookie: "crona_cbo_login_value_1=true;"}});
    });
}

function login(callback){
    var params = "cmd=login&kortnr=" + userId + "&pinkod=" + pin + "&frm_forw=Logga+in";

    Ajax.post(baseUrl, params, function(data, http){
        var headers = http.getAllResponseHeaders();

        var loc = http.getResponseHeader("Location");
        sid = loc.split("=")[1];

        callback();
    });
}
