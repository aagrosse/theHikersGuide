var latitude = 0;
var longitude = 0;

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
  $(".sidepanel").attr("style","display:block");
  console.log('weather function user location', latitude, longitude)

  var urlBase ="https://api.openweathermap.org/data/2.5/weather?appid=b650042e3a82aa70290734a60a8cb3e3&lat="+latitude+"&lon="+longitude+"&units=imperial";
                
   

  console.log(urlBase);

  $.ajax({
    url: urlBase,
    type:"GET",
    
    success:function(wetherInfo){
      console.log(wetherInfo);

         $("#location").html("Location:")
         $("#locationName").html(wetherInfo.name +  `<img src='http://openweathermap.org/img/w/${wetherInfo.weather[0].icon}.png'>`);
         $("#tempature").html("Tempature: "+ wetherInfo.main.temp+" &#8457");
         $("#humidity").html("Humidity: "+JSON.stringify(wetherInfo.main.humidity)+"%");
         $("#wind").html("Wind speed : "+JSON.stringify(wetherInfo.wind.speed)+" m/s");
         getUV (latitude, longitude)
            


    }
});

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


}



});











