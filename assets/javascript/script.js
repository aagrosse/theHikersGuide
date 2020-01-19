
$(document).ready(function() {


$('#modal1').modal();


$(".btn-floating").on("click", function() {
 $('#modal1').modal('open');
});

$("#search").on("click", function(){
  //search button click event that starts all the fun
  var cityName= $("#input").val();
  geoCode (cityName);
});



function geoCode (city) {
  var geoKey = "f51b969f42a69a";
  var geoURL = "https://us1.locationiq.com/v1/search.php?key=" + geoKey +"&q=" + city + "&format=json";
  $.ajax({
    url: geoURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
    lat = response[0].lat;
    lon = response[0].lon;
    getTrails (lat, lon);
  });
}



geoCode("atlanta")




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
 
// console.log(trailQueryURL)

$.ajax({
        url: trailQueryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        for (var i = 0; i < 16; i++){
            $("#image-" + i).attr("src", response.trails[i].imgMedium)
            $(".card-title-" + i).text(response.trails[i].name)

        } 

      
// console.log(response.trails[0].name)

     });
}


getTrails(33.763406, -84.395075);
















    


    });

    