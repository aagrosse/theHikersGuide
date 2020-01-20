var latitude = 0;
var longitude = 0;


// add event to the button to use user current location 
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
// call weather function to have access the lat & lan variable inside the weather function
weather()


}
navigator.geolocation.getCurrentPosition(getPosition);



function weather() {
  $(".sidepanel").attr("style","display:block");
  $("#sidepanel").delay(800).fadeIn();
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
         $("#tempature").html("Tempature: "+Math.floor(wetherInfo.main.temp)+" &#8457");
         $("#humidity").html("Humidity: "+JSON.stringify(wetherInfo.main.humidity)+"%");
         $("#wind").html("Wind speed : "+JSON.stringify(wetherInfo.wind.speed)+" m/s");

            


    }
});

};


});

// adding event listener to the search button to get weather info 
$("#search").on("click", function(){
  event.preventDefault();
  var city=$("#input").val();
  var tempFah = "&units=imperial";
  var urlBaseCityName = "http://api.openweathermap.org/data/2.5/weather?appid=b650042e3a82aa70290734a60a8cb3e3&q="+city+tempFah;
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

  })
  
 
 
});












