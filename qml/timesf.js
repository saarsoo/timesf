Qt.include("ajax.js");

function clickedIn() {
    get("http://google.se", function(data){
        console.log(data);
    });
}
