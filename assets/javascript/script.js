
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


  var latitude = 0;
  var longitude = 0;
  
  
  
  
  // check if the browser support the getlocation API
  function supportRequest() {
    if (navigator.getLocation) {
      
      navigator.geolocation.getCurrentPosition(getPosition);
    }else {
      alert("Geolocation is not supported by this browser !");
    }
  }
  
  function getPosition(success){
    console.log(' getposition function')
  
    latitude =  success.coords.latitude;
    longitude = success.coords.longitude;
    console.log('right after update', latitude, longitude)
    
    console.log(success);
  
  weather()
  getTrails (latitude, longitude)
  
  }
  navigator.geolocation.getCurrentPosition(getPosition);
  
  
  
  function weather() {
    console.log('weather function user location', latitude, longitude)
  
    var urlBase ="https://api.openweathermap.org/data/2.5/weather?appid=b650042e3a82aa70290734a60a8cb3e3&lat="+latitude+"&lon="+longitude+"&units=imperial";
                  
     
  
    console.log(urlBase);
  
    $.ajax({
      url: urlBase,
      type:"GET",
      
      success:function(wetherInfo){
        console.log(wetherInfo);
  
           $("#icon").html(`<img src='http://openweathermap.org/img/w/${wetherInfo.weather[0].icon}.png'>`)
           $("#locationName").html(wetherInfo.name);
           $("#tempature").html("Tempature: "+ wetherInfo.main.temp+" &#8457");
           $("#humidity").html("Humidity: "+JSON.stringify(wetherInfo.main.humidity)+"%");
           $("#wind").html("Wind speed : "+JSON.stringify(wetherInfo.wind.speed)+" m/s");
  
           getUV (latitude, longitude)
  
         
  
  
      }
  });
  
  
  }

  function getUV (lat, lon) {
    // an API call to get UV data an post data to the DOM
  var key = "3111507f84c92e1af42924418f205282";
  var uvQuery = "https://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + lat + "&lon=" + lon;
  

    $.ajax({
        url: uvQuery,
        method: "GET"
      }).then(function(response) {
        $("#uvIndex").text("UV Index: " + (response.value));
        var uv = response.value;
        if (uv < 3) { 
            $("#uvIndex").removeClass()
            $("#uvIndex").addClass("new badge green")
          } else if (uv < 7) { 
            $("#uvIndex").removeClass()
            $("#uvIndex").addClass("new badge yellow")
          } else if (uv < 11) { 
            $("#uvIndex").removeClass()
            $("#uvIndex").addClass("new badge red")
          }
      });
    }   






});