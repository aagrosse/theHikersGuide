
$(document).ready(function() {


console.log("hello")


var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + 
    + "b9da2b7e40a98e59cb40534717905908";

$('#modal1').modal();


    // // Remove elements with hide
    // document.getElementById(".row").hidden = false;
    // document,getElementById("cardResults").hidden = true;
    // resultCard.classList.remove("hide");
    // searchBtn.classList.remove("hide");
    // // userEntry.s
    


function getTrails (lat, lon) {
    var trailKey = "200668995-d0d69e4094ff3a415bc5f83a7340a09a";
    var dist = 10;
    var res = 16;
    var trailQueryURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=" + dist + "&maxResults=" + res + "&key=" + trailKey;
 
console.log(trailQueryURL)

$.ajax({
        url: trailQueryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        for (var i = 0; i < 16; i++){
            $("#image-" + i).attr("src", response.trails[i].imgMedium)
            $(".card-title-" + i).text(response.trails[i].name)

        } 

      
console.log(response.trails[0].name)

     });
}


getTrails(33.763406, -84.395075);



// check if the browser support the getlocation API
function supportRequest() {
  if (navigator.getLocation) {
    navigator.geolocation.getCurrentPosition(getPosition);
  }
  else {
    alert("Geolocation is not supported by this browser !");
  }
}
navigator.geolocation.getCurrentPosition(getPosition);
// getting current location from navigator API
function getPosition(position) {
  console.log("this is position:", position);
  console.log("this is latitude:", position.coords.latitude);
  console.log("this is longitude", position.coords.longitude);
  latitude =  position.coords.latitude;
  longitude = position.coords.longitude;
  console.log("this is latitude:",latitude);
  console.log("this is longitude",longitude);
}











//  Identify the variables needed to target
// var resultCard = document.querySelector(".card");
// var searchBtn = document.querySelector("#search");
// // var userEntry = document.querySelector(input);


// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + 
//     + "b9da2b7e40a98e59cb40534717905908";

//     $("#search").on('click', function(){

//     // Remove elements with hide
//     resultCard.classList.remove("hide");
//     searchBtn.classList.remove("hide");
    


    


    });

    