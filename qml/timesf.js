Qt.include("ajax.js");

function logIn(callback) {
    get("http://google.se", function(data){
        callback(data)
    });
}

function logOut(callback){
    get("http://google.se", function(data){
        callback(data);
    });
}

function getLogs(callback) {
    get("http://google.se", function(data){
        callback([{type: "IN", time: "08:32"}, {type: "OUT", time: "11:36"}, {type: "IN", time: "12:21"}])
    });
}
