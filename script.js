var latitude = 0;
var longitude = 0;
var sidePanelDiv=$(".sidepanel");

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
  console.log();
  latitude =  position.coords.latitude;
  longitude = position.coords.longitude;
  
  console.log("this is latitude:",latitude);
  console.log("this is longitude",longitude);
}

function weatherSidePanel(){

    $.ajax({
        url:"https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=b650042e3a82aa70290734a60a8cb3e3=imperial",
        type:"GET",
        
        success:function(wetherInfo){
            console.log(wetherInfo);




            $("<p>").html("");
            sidePanelDiv.appended("<p>");





            //  $(".cityName").html("Location: "+ wetherInfo.name +  `<img src='http://openweathermap.org/img/w/${wetherInfo.weather[0].icon}.png'>` + " Date: ");
            // $(".weather").html(" Description : "+wetherInfo.weather[0].description);
            // $(".tempature").html("Tempature: "+ wetherInfo.main.temp+"&#8457");
            // $(".humidity").html("Humidity: "+JSON.stringify(wetherInfo.main.humidity)+" %");
            // becuse speed object has number in it we need to convert that with JSON.stringfy to string
            // $(".wind").html("Wind speed : "+JSON.stringify(wetherInfo.wind.speed)+"m/s");
            // $(".uvIndex").html("UVIndex: ");
    
           
    
    
        }
    });
    









};
weatherSidePanel();


























// $(".sidepanel").html();