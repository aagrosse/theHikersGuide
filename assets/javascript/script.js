

















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
  var cityName= $("#form").val();
  if (cityName !== "") {
  geoCode (cityName);
  getWeather(cityName);
  console.log(cityName);
  $('#hidevid').hide();
  $('#form').hide();
  $('#userEntry').hide();
  $(".row").attr("style","display:block");
  $(".row").delay(800).fadeIn();
  $("body").addClass("body");
  $("#restart").attr("style","display:block");
  } else {
  Materialize.toast('Enter a valid city name. Example: "Chicago". Do not include numbers or special characters.', 3000, 'rounded')
      }
     
    
  
  event.preventDefault();
});
  
  
  $("#geolocationBtn").on("click",function(){
    // check if the browser support the getlocation API
    function supportRequest() {
      if (navigator.getLocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
      }else {
        alert("Geolocation is not supported by this browser !");
      }
    }
    function getPosition(success){
      lat =  success.coords.latitude;
      lon = success.coords.longitude;
     
    // call weather function to have access the lat & lan variable inside the weather function
    weather(lat,lon);
    getTrails (lat, lon);
    getUV (lat, lon);
    $('#hidevid').hide();
    $('#userEntry').hide();
    $(".row").attr("style","display:block");
    $(".row").delay(800).fadeIn();
    $("body").addClass("body");
    $("#restart").attr("style","display:block");
    }
    navigator.geolocation.getCurrentPosition(getPosition);
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
          getUV (lat, lon);
          console.log("hello")
        });
      }


// Remove elements with hide
    function pageLoad() {
            $(".row").hide();
        }

// This code will show the results once the user inputs a city
    // function showResults() {
        // let $("#close").hidden = false;
// }

   // Remove elements with hide
    // 
    // document.getElementById("cardResults").hidden = true;
    // resultCard.classList.remove("hide");
    // searchBtn.classList.remove("hide");
    // userEntry.s
    
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
            $(".card-title-" + i).text(response.trails[i].name)
            var ident = (response.trails[i].id);
            $("#btn-" + i).attr("d",ident);
            if ((response.trails[i].imgMedium) === ""){
              $("#image-" + i).attr("src", "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
            }else{
              $("#image-" + i).attr("src", response.trails[i].imgMedium);
            };

        } 
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
      
      if ((response.trails[0].difficulty) === "green"){
        $("#tDifficulty-0").text("Trail Difficulty: Easy");
      }else if((response.trails[0].difficulty) === "greenBlue"){
        $("#tDifficulty-0").text("Trail Difficulty: Easy / Intermediate");
      }else if((response.trails[0].difficulty) === "blue"){
        $("#tDifficulty-0").text("Trail Difficulty: Intermediate");
      }else if((response.trails[0].difficulty) === "blueBlack"){
        $("#tDifficulty-0").text("Trail Difficulty: Intermediate / Difficult");
      }else {
        $("#tDifficulty-0").text("Trail Difficulty: Difficult");};
      console.log(response.trails[0].difficulty); 

      $("#tSummary-0").text("Trail Summary: " + (response.trails[0].summary));
     console.log(_.map(response, "trails[0].name"));
      if ((response.trails[0].imgMedium) === ""){
        $("#tImage-0").attr("src", "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
      }else{
        $("#tImage-0").attr("src", response.trails[0].imgMedium);

      };
      
    });
  }
  
  
  function weather(lat, lon) {
    $(".sidepanel").attr("style","display:block");
    $("#sidepanel").delay(800).fadeIn();
    var urlBase ="https://api.openweathermap.org/data/2.5/weather?appid=b650042e3a82aa70290734a60a8cb3e3&lat="+lat+"&lon="+lon+"&units=imperial";
                  
     
  
    console.log(urlBase);
  
    $.ajax({
      url: urlBase,
      type:"GET",
      
      success:function(wetherInfo){
        console.log(wetherInfo);
  
           $("#location").html("Location:")
           $("#locationName").html(wetherInfo.name +  `<img src='http://openweathermap.org/img/w/${wetherInfo.weather[0].icon}.png'>`);
           $("#tempature").html("Tempature: "+Math.floor(wetherInfo.main.temp)+" &#8457");
           $("#humidity").html("Humidity: "+JSON.stringify(wetherInfo.main.humidity)+"%");
           $("#wind").html("Wind speed : "+JSON.stringify(wetherInfo.wind.speed)+" m/s");
           
              
      }
     
    });
    }

   function getWeather(city){
      var urlBaseCityName = "http://api.openweathermap.org/data/2.5/weather?appid=b650042e3a82aa70290734a60a8cb3e3&q="+city+"&units=imperial";
      console.log("success link00",urlBaseCityName);
      $(".sidepanel").attr("style","display:block");
      $("#sidepanel").delay(800).fadeIn();
      $.ajax({
        url:urlBaseCityName,
        type:"GET",
        success:function(cityWeatherInfo){
    
             $("#location").html("Location:")
             $("#locationName").html(cityWeatherInfo.name +  `<img src='http://openweathermap.org/img/w/${cityWeatherInfo.weather[0].icon}.png'>`);
             $("#tempature").html("Tempature: "+Math.floor(cityWeatherInfo.main.temp)+" &#8457");
             $("#humidity").html("Humidity: "+JSON.stringify(cityWeatherInfo.main.humidity)+"%");
             $("#wind").html("Wind speed : "+JSON.stringify(cityWeatherInfo.wind.speed)+" m/s");
        }
        });
            }
    

            function getUV (lat, lon) {
              // API call to get UV data and post data to the DOM
            var key = "b650042e3a82aa70290734a60a8cb3e3";
            var uvQuery = "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + key + "&lat=" + lat + "&lon=" + lon;
            console.log(uvQuery)
            console.log(lat,lon)
            
              $.ajax({
                  url: uvQuery,
                  method: "GET"
                }).then(function(response) {
                  $("#uvIndex").text("UV Index: " + (response[0].value));
                  var uv = response[0].value;
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
            
        
      // restart the page for another search
           $("#restart").on("click", function () {
            $('#hidevid').show();
            $('#userEntry').show();
            $('#form').show();
            $('.sidepanel').hide();
            $("#restart").attr("style","display:none");
            $(".row").attr("style", "display:none");
            document.getElementById('form').value = '';
           })


















      
          });  
     
