$(document).ready(function(){
//  Identify the variables needed to target
var resultCard = document.querySelector(".card");
var searchBtn = document.querySelector("#search");
var userEntry = document.querySelector(input);



var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + 
    + "b9da2b7e40a98e59cb40534717905908";

    $("#search").on('click', function(){

    // Remove elements with hide
    document.getElementById().hidden = false;
    document,getElementById("cardResults").hidden = true;
    resultCard.classList.remove("hide");
    searchBtn.classList.remove("hide");
    userEntry.
    

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(queryURL);
    }