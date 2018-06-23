// Calling for weather info
    //Calling by City
    var APIKey = "33600f0073ced31aaa6969ba360fc0d0";
    var QueryURLCity = "https://api.openweathermap.org/data/2.5/weather?q=" + "Minneapolis" + "&units=imperial&appid=" + APIKey;
    var QueryURLZip = "https://api.openweathermap.org/data/2.5/weather?q=" + "55405" + "&units=imperial&appid=" + APIKey;
  
    $(document).ready(function() {

    $.ajax({
        url: QueryURLCity,
        method: 'GET'

    }).then(function(response) {

        console.log(QueryURLCity);
        console.log(response);

        $("#temp").text("Temperature: " + response.main.temp);
        $("#wind").text("Wind Speed: " + response.wind.speed);
        $("#humidity").text("Humidty: " + response.main.humidity);

        console.log("Temperature: " + response.main.temp);
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidty: " + response.main.humidity);

    });

    //Calling by Zip code
    $.ajax({
        url: QueryURLZip,
        method: 'GET'

    }).then(function(response) {

        console.log(QueryURLZip);
        console.log(response);

        $("#temp-2").text("Temperature: " + response.main.temp);
        $("#wind-2").text("Wind Speed: " + response.wind.speed);
        $("#humidity-2").text("Humidty: " + response.main.humidity);

        console.log("Temperature: " + response.main.temp);
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidty: " + response.main.humidity);

    });
    });
//

//Capturing dates
    var departDate = "";
    var returnDate = "";

    $()
    function dateSetter() {
    $("#departDateInput").html(departDate);
    $("#returnDateInput").html(returnDate);
    
    };

    dateSetter();








