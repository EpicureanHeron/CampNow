
var APIkey = "4f3188b24b25b236bcf5a2cffd75cfe6";
var locationQuery = $("#locationInput").val().trim();
var QueryURL ="api.openweathermap.org/data/2.5/forecast?q=" + locationQuery + "&units=imperial&appid=" + APIkey;

$(document).ready(function() {
    $("#submit-button").on("click", function(event) {
        event.preventDefault();
        $.ajax({
            url: QueryURL,
            method: 'GET'
        }).then(function(response) {
            console.log(QueryURL);
            console.log(response);   

            $("#temp").text("Temperature: " + response.main.temp);
            $("#wind").text("Wind Speed: " + response.wind.speed);
            $("#humidity").text("Humidty: " + response.main.humidity);
    
            console.log("Temperature: " + response.main.temp);
            console.log("Wind Speed: " + response.wind.speed);
            console.log("Humidty: " + response.main.humidity);
        });
    });
});
