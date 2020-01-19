var latitude = 0;
var longitude = 0;

$("#geolocation").on("click",function(){
  // alert("hello");

  

  $("#sidepanel").attr("style","display:block");


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

         $("#location").html("Location:")
         $("#locationName").html(wetherInfo.name +  `<img src='http://openweathermap.org/img/w/${wetherInfo.weather[0].icon}.png'>`);
         $("#tempature").html("Tempature: "+ wetherInfo.main.temp+" &#8457");
         $("#humidity").html("Humidity: "+JSON.stringify(wetherInfo.main.humidity)+"%");
         $("#wind").html("Wind speed : "+JSON.stringify(wetherInfo.wind.speed)+" m/s");

            


    }
});



};






});













