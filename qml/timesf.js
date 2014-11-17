.import "ajax.js" as Ajax

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
    Ajax.get("http://google.se", function(data){
        callback([{type: "IN", time: "08:32"}, {type: "OUT", time: "11:36"}, {type: "IN", time: "12:21"}]);
    });
}
