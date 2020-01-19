
$(document).ready(function() {


$('#modal1').modal();


$(".btn-floating").on("click", function() {
 $('#modal1').modal('open');
 trailId = $(this).attr('d');
 getModal (trailId);
 console.log (trailId);
});

$("#search").on("click", function(e){
  //search button click event that starts all the fun
  e.preventDefault();
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







    // Remove elements with hide
    // document.getElementById().hidden = false;
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
            // $("#image-" + i).attr("src", response.trails[i].imgMedium)
            $(".card-title-" + i).text(response.trails[i].name)
            var ident = (response.trails[i].id);
            $("#btn-" + i).attr("d",ident);
            if ((response.trails[i].imgMedium) === ""){
              $("#image-" + i).attr("src", "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
            }else{
              $("#image-" + i).attr("src", response.trails[i].imgMedium);
            };

        } 

      
// console.log(response.trails[0].name)

     });
}





function getModal (trailId) {
  var trailKey2 = "200668995-d0d69e4094ff3a415bc5f83a7340a09a";
  var QueryURL = "https://www.hikingproject.com/data/get-trails-by-id?ids=" + trailId +"&key=" + trailKey2;

// console.log(trailQueryURL)

$.ajax({
      url: QueryURL,
      method: "GET"
  }).then(function(response) {
      console.log(response);
      // $("#tImage-0").attr("src", "");
      // $("#tImage-0").attr("src", response.trails[0].imgMedium);
      $("#tName-0").text("Trail Name: " +(response.trails[0].name));
      $("#tStar-0").text("Trail Star Rating: " + (response.trails[0].stars));
      $("#tLocation-0").text("Trail Location: " + (response.trails[0].location));
      $("#tLength-0").text("Trail Length (miles): " +(response.trails[0].length));
      $("#tAscent-0").text("Trail Ascent (ft): " + (response.trails[0].ascent));
      $("#tDescent-0").text("Trail Descent (ft): " + (response.trails[0].descent));
      $("#tHigh-0").text("Trail High Point: " + (response.trails[0].high));
      $("#tLow-0").text("Trail Low Point: " + (response.trails[0].low));
      $("#tDifficulty-0").text("Trail Difficulty: " + (response.trails[0].difficulty));
      $("#tSummary-0").text("Trail Summary: " + (response.trails[0].summary));
      if ((response.trails[0].imgMedium) === ""){
        $("#tImage-0").attr("src", "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
      }else{
        $("#tImage-0").attr("src", response.trails[0].imgMedium);
      };
      console.log(response.trails[0].imgMedium)











    });
  }


 

    






});