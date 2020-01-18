console.log("hello")




var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + 
    + "b9da2b7e40a98e59cb40534717905908";


    // Remove elements with hide
    document.getElementById().hidden = false;
    document,getElementById("cardResults").hidden = true;
    resultCard.classList.remove("hide");
    searchBtn.classList.remove("hide");
    // userEntry.s
    


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


getTrails(39.9787, -105.2755);

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
    


    


    // });

    