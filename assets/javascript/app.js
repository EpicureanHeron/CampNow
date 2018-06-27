//https://developer.nps.gov/api/v1/parks?stateCode=MN&api_key=N31BSTd4vcXAUWTFUb3FPdW4zBX1Jw3gVc5Sisw1

$(document).ready(function() {
    $("#submit-park").on("click", function(event) {
        event.preventDefault();
        
   
       var where = $("#where").val().trim();
        $('#buttonInput').val('');
   
        console.log(where)
    weather()
    getParksByState(where)
   // googleMaps(where)
    });
})


  //clears the gifs if there are some there

  
//this is the jquery ajax call
function getParksByState(locationQuery){

    
    var parksBaseURL = "https://developer.nps.gov/api/v1/parks?";

    var parksStateCode = "stateCode=";

    var parksAPIKey = "&api_key=N31BSTd4vcXAUWTFUb3FPdW4zBX1Jw3gVc5Sisw1";

    var parksAJAX = parksBaseURL + parksStateCode + locationQuery + parksAPIKey ;

    console.log(parksAJAX);



    $.ajax({
    //takes the URL which is our queryURL
    url: parksAJAX,
    //magic method of GET (something something SERVER HTTP STUFF something something)
    method: "GET"
    })
    //happens after the promise above is fullfilled
    .then(function(response) {
        
         console.log(response)
        for(i = 0; i < response.data.length; i ++){

            var newDiv = $("<div>");

            var parkNameP = $("<h3>");

            var parkDescP = $("<p>");

            parkNameP.html(response.data[i].fullName);

            parkDescP.html(response.data[i].description);

            newDiv.append(parkNameP);

            newDiv.append(parkDescP);

            newDiv.addClass("joePlaceHolder clickable")

            newDiv.attr("latLong", response.data[i].latLong)

            newDiv.attr("fullName", response.data[i].fullName)

            $("#displayParks").append(newDiv)

        }

    });
}

// $('body').on('click', '.clickable', function () {

//     var 
// })


/////////////
function googleMaps(queryCaptured) {
    
    ///////GOOGLE MAPS STUFF///////
    // window.onload = function() {
    var map;
    var service;
    var infowindow;
    
    function initMap() {

        console.log("initMap Triggered")
    
        var queryToUse = "Grand Portage"

        console.log(queryToUse)
        var request = {
        query: queryToUse,
        fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],
        

    }
    service = new google.maps.places.PlacesService(document.createElement("div"));
    service.findPlaceFromQuery(request, callback);
    }

    
    function callback(results, status) {
        console.log("callback Triggered")
        console.log()
        if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
    
            console.log(results[i]);
        }
        }
        else{
            console.log("NOPE THE MAPS THING DID NOT WORK")
        }
    }
    initMap()
    //closes the window on load function
    // }

}

function weather(){
//Calling weather API
var APIkey = "33600f0073ced31aaa6969ba360fc0d0";


    // var locationInput = $("").val().trim(); // <--- WHAT TO INPUT???? 
    // Use lat={lat}&lon={lon} for coordinates
    var QueryURL ="https://api.openweathermap.org/data/2.5/forecast?" + "lat=28&lon=82"  + "&units=imperial&appid=" + APIkey;
    $.ajax({
        url: QueryURL,
        method: 'GET'
    }).then(function(response){
        console.log(response, " is the weather");
        for (var i = 0; i < response.list.length; i++) {
            $("#weather").append("<div id='temp'>" + response.list[i].main.temp + "</div><div id='wind'>" + response.list[i].wind.speed + "</div><div id='humidity'>" + response.list[i].main.humidity + "</div>")
            //$("#weather").append(weatherDisplay(response, i))
            //console.log(weatherResponse(response, i))
            response.list[i].main.temp
        }
        // <div id="temp"></div>
        // <div id="wind"></div>
        // <div id="humidity"></div> 
    })
    
   function weatherDisplay(response, i) {
       return "<div id='temp'>" + response.list[i].main.temp + "</div><div id='wind'>" + response.list[i].wind.speed + "</div><div id='humidity'>" + response.list[i].main.humidity + "</div>"
   }     
    
    
     
    


}

// Below is the API response based on geographic coordinates:

// {"city":{"id":1851632,"name":"Shuzenji",
// "coord":{"lon":138.933334,"lat":34.966671},
// "country":"JP",
// "cod":"200",
// "message":0.0045,
// "cnt":38,
// "list":[{
//         "dt":1406106000,
//         "main":{
//             "temp":298.77,
//             "temp_min":298.77,
//             "temp_max":298.774,
//             "pressure":1005.93,
//             "sea_level":1018.18,
//             "grnd_level":1005.93,
//             "humidity":87,
//             "temp_kf":0.26},
//         "weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],
//         "clouds":{"all":88},
//         "wind":{"speed":5.71,"deg":229.501},
//         "sys":{"pod":"d"},
//         "dt_txt":"2014-07-23 09:00:00"}
//         ]}
