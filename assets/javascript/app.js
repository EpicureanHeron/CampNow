var parkCodeToPass = ""
var fullNameToPass = ""
var stateArr = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];


$(document).ready(function() {
   

    $("#submitButton").on("click", function(event) {
        event.preventDefault();
        $("#weather").empty()
        $("#displayParks").empty()
        $("#parksImg").empty()
        $("#campInfo").empty()

        var where = $("#where").val().trim();
        $('#buttonInput').val('');

        
  
        if((where.length === 2) && ($.inArray(where, stateArr)) != -1) {
        getParksByState(where)
       
    }
    
    else{
       
        $('#myModal').modal('show')
    }

   
 
    
    });
})

function getParksByState(locationQuery){
    
    var parksBaseURL = "https://developer.nps.gov/api/v1/parks?";

    var parksStateCode = "stateCode=";

    var parksAPIKey = "&api_key=N31BSTd4vcXAUWTFUb3FPdW4zBX1Jw3gVc5Sisw1";

    var parksAJAX = parksBaseURL + parksStateCode + locationQuery + parksAPIKey ;

    



    $.ajax({
    
    url: parksAJAX,
    
    method: "GET"
    })
  
    .then(function(response) {
        
       
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

            newDiv.attr("parkCode", response.data[i].parkCode)

            $("#displayParks").append(newDiv)

        }

    });
}

$('body').on('click', '.clickable', function () {

    parkCodeToPass = $(this).attr("parkCode");

    fullNameToPass = $(this).attr("fullName");

    $("#displayParks").empty()


    //THE BELOW FORMATS THE LAT AND LON FROM THE PARKS INFO TO BE PASSABLE TO THE WEATHER API
    //PARKS INFO IS IN "LAT:XX.XXXX, LONG:XX.XXX" FORMAT
    //WEATHERAPI IS EXPECTING TWO VARIABLES FORMATTED "LAT=XX.XXX" AND "LONG=XX.XXX"

    var latLong = $(this).attr("latLong")

    
    var newLatLong = latLong.split(", ")
   
    var latLongReformatted = [];
    for (i = 0; i < newLatLong.length; i ++){
        var newFormat = newLatLong[i].replace(":", "=");
        newFormat = newFormat.slice(0, 12)
        latLongReformatted.push(newFormat)
    }
    latLongReformatted[1] = latLongReformatted[1].replace("long", "lon");
   

    weather(latLongReformatted[0], latLongReformatted[1])
})

function getParksInfoByCode (parkCode) {


    var parksCampBaseURL = "https://developer.nps.gov/api/v1/campgrounds?";

    var parksCampQuery = "parkCode=";

    var parksAPIKey = "&api_key=N31BSTd4vcXAUWTFUb3FPdW4zBX1Jw3gVc5Sisw1";

    var parksAJAX = parksCampBaseURL + parksCampQuery + parkCode + parksAPIKey ;

   

    $.ajax({
        //takes the URL which is our queryURL
        url: parksAJAX,
        //magic method of GET (something something SERVER HTTP STUFF something something)
        method: "GET"
        })
        //happens after the promise above is fullfilled
        .then(function(response) {
           // var info = response.data[0].amenities
  
            if(response.data.length > 0 ) {
                for(i = 0; i < response.data.length; i ++){
                    var parksInfoDiv = $("<div>")

                    parksInfoDiv.addClass("campSitePlaceHolder")

                    var parksInfoH2 = $("<h2>")
                    parksInfoH2.html(response.data[i].name)
                    parksInfoDiv.append(parksInfoH2)

                    var parksInfoP = $("<p>")
                    parksInfoP.html(response.data[i].description)
                    parksInfoDiv.append(parksInfoP)

                    var parksInfoP = $("<p>")
                    parksInfoP.html(response.data[i].directionsOverview)
                    parksInfoDiv.append(parksInfoP)

                    var parksInfoP = $("<p>")
                    parksInfoP.html(response.data[i].weatherOverview)
                    parksInfoDiv.append(parksInfoP)

                    $("#campInfo").append(parksInfoDiv)
                    //internet
                    if(response.data[i].amenities.internetConnectivity) {
                        var parksInfoP = $("<p>")
                        parksInfoP.html("Internet is available")
                        parksInfoDiv.append(parksInfoP)
                    }
                    else{
                        var parksInfoP = $("<p>")
                        parksInfoP.html("Internet is not available")
                        parksInfoDiv.append(parksInfoP)
                    }
                    //cellPhoneReceiption
                    if(response.data[i].amenities.cellPhoneReception) {
                        var parksInfoP = $("<p>")
                        parksInfoP.html("There is some cell phone reception. ")
                        parksInfoDiv.append(parksInfoP)
                    }
                    else{
                        var parksInfoP = $("<p>")
                        parksInfoP.html("There is no cell phone reception.")
                        parksInfoDiv.append(parksInfoP)
                    }

                    //toilets
                    if(response.data[i].amenities.toilets[0] || response.data[i].amenities.toilets[0] !== ""){
                        var parksInfoP = $("<p>")
                        parksInfoP.html(response.data[i].amenities.toilets[0])
                        parksInfoDiv.append(parksInfoP)
                    } else{
                        var parksInfoP = $("<p>")
                        parksInfoP.html("There are no public restrooms. ")
                        parksInfoDiv.append(parksInfoP)
                    }
                    //showers
                    if(response.data[i].amenities.showers[0] && response.data[i].amenities.showers[0] !== "None"){
                        var parksInfoP = $("<p>")
                        parksInfoP.html(response.data[i].amenities.showers[0])
                        parksInfoDiv.append(parksInfoP)
                    } else{
                        var parksInfoP = $("<p>")
                        parksInfoP.html("There are no showers.")
                        parksInfoDiv.append(parksInfoP)
                    }
                    //potableWater
                    if(response.data[i].amenities.potableWater[0] || response.data[i].amenities.potableWater[0] !== ""){
                        var parksInfoP = $("<p>")
                        parksInfoP.html("Potable water: "+ response.data[i].amenities.showers[0])
                        parksInfoDiv.append(parksInfoP)
                    } else{
                        var parksInfoP = $("<p>")
                        parksInfoP.html("There is no potable water information.")
                        parksInfoDiv.append(parksInfoP)
                    }
                    //laundry
                    if(response.data[i].amenities.laundry) {
                        var parksInfoP = $("<p>")
                        parksInfoP.html("There is laundry available. ")
                        parksInfoDiv.append(parksInfoP)
                    }
                    else{
                        var parksInfoP = $("<p>")
                        parksInfoP.html("There is no laundry available.")
                        parksInfoDiv.append(parksInfoP)
                    }
                    //foodStorageLockers
                    if(response.data[i].amenities.foodStorageLockers[0] || response.data[i].amenities.foodStorageLockers[0] !== ""){
                        var parksInfoP = $("<p>")
                        parksInfoP.html("Food storage lockers: " + response.data[i].amenities.foodStorageLockers)
                        parksInfoDiv.append(parksInfoP)
                    } else{
                        var parksInfoP = $("<p>")
                        parksInfoP.html("There is not information concerning food storage lockers")
                        parksInfoDiv.append(parksInfoP)
                    }
                //this line closes the for loop
                }
            //this line closes the IF statement
            }
            else{
                var parksInfoDiv = $("<div>")

                parksInfoDiv.addClass("campSitePlaceHolder")

                var parksInfoH2 = $("<h2>")
                parksInfoH2.html("There are no parks for this location!")
                parksInfoDiv.append(parksInfoH2)
                $("#campInfo").append(parksInfoDiv)

            }
                googleMaps(fullNameToPass)  
            });
        }













function googleMaps(queryCaptured) {
    
    var map;
    var service;
    var infowindow;
    
    function initMap() {
        var request = {
        query: queryCaptured,
        fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],
    }
    service = new google.maps.places.PlacesService(document.createElement("div"));
    service.findPlaceFromQuery(request, callback);
    }

    
    function callback(results, status) {
 
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {

                var place = results[i];
            
                var newPhoto =  place.photos[0].getUrl({'maxWidth': 1000, 'maxHeight': 400})
            

                var newDiv = $("<div>")
                newDiv.addClass("campSitePlaceHolder")
                var newImg = $("<img>")
                newImg.attr("src", newPhoto)
                newDiv.append(newImg)
                $("#parksImg").append(newDiv)

            }
     
        }
        
    }  
    initMap()
}

function weather(lat, lon) {  
   
        var APIkey = "33600f0073ced31aaa6969ba360fc0d0";
    
        var QueryURL ="https://api.openweathermap.org/data/2.5/forecast?" + lat + "&" + lon  + "&units=imperial&appid=" + APIkey;
   
        $.ajax({
            url: QueryURL,
            method: 'GET'
        }).then(function(response){
         
            for (var i = 0; i < response.list.length; i++) {
                if (i%8 === 0) {
          
                var weatherDisp = $("<div>")

                var weatherP = $("<h2>")
                weatherP.html(response.list[i].dt_txt.slice(0,10))
                weatherDisp.append(weatherP)


                var weatherP = $("<p>")
                weatherP.html("Temp: " + response.list[i].main.temp + "&#176; F")
                weatherDisp.append(weatherP)
       

                var weatherP = $("<p>")
                weatherP.html("Wind Speed: " + response.list[i].wind.speed + " MPH")
                weatherDisp.append(weatherP)


                // var weatherP = $("<p>")
                // weatherP.html("Humidity: " + response.list[i].main.humidity)
                // weatherDisp.append(weatherP)
               

                var weatherP = $("<p>")
                weatherP.html("Weather: " + response.list[i].weather[0].description)
                weatherDisp.append(weatherP)
                
                weatherDisp.addClass("weather")
                
                $("#weather").append(weatherDisp)
               
                }
            }

            getParksInfoByCode(parkCodeToPass)
        })

    }
    