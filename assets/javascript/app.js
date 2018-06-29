//TO DOs
//IF no LAT/LONG exists, do not trigger weather and say that the area is too big...perhaps runs the name of the park instead?
//If no campgrounds exists, communicate as much
//"reset" button which could bring them back to the state park page (runs the API for the NPS again based on their saved state info)
//Add another "reset" button which pulls up the original fields on the page to search by state



//https://developer.nps.gov/api/v1/parks?stateCode=MN&api_key=N31BSTd4vcXAUWTFUb3FPdW4zBX1Jw3gVc5Sisw1

var parkCodeToPass = ""
var fullNameToPass = ""

$(document).ready(function() {
   

    $("#submitButton").on("click", function(event) {
        event.preventDefault();


        //call modal

    

        
    // This line of code will grab the input from the textbox
       var where = $("#where").val().trim();
        $('#buttonInput').val('');
    // The movie from the textbox is then added to our array
        console.log(where)
    // Calling renderButtons which handles the processing of our movie array
    if(where.length === 2) {
        getParksByState(where)
        renderResetButton()
    }
    else{
        console.log("Modal should Appear")
        $('#myModal').modal('show')
    }

   
 
    
    });
})


function renderResetButton(){

    var newButton = $("<button>")
    newButton.addClass("resetButton")
    newButton.html("Reset Your Trip")
    $("#resetButton").append(newButton)
}

$('body').on('click', '.resetButton', function () {
    $("#displayParks").empty()
    $("#parksImg").empty()
    $("#campInfo").empty()
var newInput = $("<form> Which State do you want to camp in?: <input type='text' name='where' id='where'><br> <input type='submit' value='Submit' id='submitButton'> </form>")
    $(".airShoppingDateFieldWrap").append(newInput)


})



  
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

            newDiv.attr("parkCode", response.data[i].parkCode)

            $("#displayParks").append(newDiv)

        }

    });
}

$('body').on('click', '.clickable', function () {

    parkCodeToPass = $(this).attr("parkCode");

    fullNameToPass = $(this).attr("fullName");
    
    console.log("THIS IS THE FULL NAME TO PASS " + fullNameToPass)

    console.log(parkCodeToPass)

    $("#displayParks").empty()
    //THE BELOW FORMATS THE LAT AND LON FROM THE PARKS INFO TO BE PASSABLE TO THE WEATHER API
    //PARKS INFO IS IN "LAT:XX.XXXX, LONG:XX.XXX" FORMAT
    //WEATHERAPI IS EXPECTING TWO VARIABLES FORMATTED "LAT=XX.XXX" AND "LONG=XX.XXX"

    var latLong = $(this).attr("latLong")

    console.log(typeof latLong)
    console.log(latLong)
    var newLatLong = latLong.split(", ")
    console.log(newLatLong)
    var latLongReformatted = [];
    for (i = 0; i < newLatLong.length; i ++){
        var newFormat = newLatLong[i].replace(":", "=");
        newFormat = newFormat.slice(0, 12)
        latLongReformatted.push(newFormat)
    }
    latLongReformatted[1] = latLongReformatted[1].replace("long", "lon");
    console.log(latLongReformatted)


    //THREE AJAX CALLS

    //This gets the amenities info from the NPS API
    
    //Gets a picture from the Google Maps API
    
    //googleMaps(fullNameToPass)

    //googleMaps(where)
    //Returns weather info
    weather(latLongReformatted[0], latLongReformatted[1])
})

function getParksInfoByCode (parkCode) {


    var parksCampBaseURL = "https://developer.nps.gov/api/v1/campgrounds?";

    var parksCampQuery = "parkCode=";

    var parksAPIKey = "&api_key=N31BSTd4vcXAUWTFUb3FPdW4zBX1Jw3gVc5Sisw1";

    var parksAJAX = parksCampBaseURL + parksCampQuery + parkCode + parksAPIKey ;

    console.log(parksAJAX)

    $.ajax({
        //takes the URL which is our queryURL
        url: parksAJAX,
        //magic method of GET (something something SERVER HTTP STUFF something something)
        method: "GET"
        })
        //happens after the promise above is fullfilled
        .then(function(response) {
           // var info = response.data[0].amenities
            console.log("Below this should be the park info")
            console.log(response)
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












/////////////
function googleMaps(queryCaptured) {
    
    ///////GOOGLE MAPS STUFF///////
    // window.onload = function() {
    var map;
    var service;
    var infowindow;
    
    function initMap() {

        console.log("initMap Triggered")
    
        console.log(queryCaptured)

        //console.log(queryToUse)
        var request = {
        query: queryCaptured,
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
           
           console.log(place);

        
           ///NEW CODE
           //THIS WORKS!
           var newPhoto =  place.photos[0].getUrl({'maxWidth': 1000, 'maxHeight': 400})
          console.log(newPhoto)
          //console.log(place.photos[0])
            var newDiv = $("<div>")
            newDiv.addClass("campSitePlaceHolder")
            var newImg = $("<img>")
            newImg.attr("src", newPhoto)
            newDiv.append(newImg)
            $("#parksImg").append(newDiv)


           ////END NEW CODE
           
        }
       // console.log(photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35}))
        }
        else{
            console.log("NOPE THE MAPS THING DID NOT WORK")
        }
    }


    
    initMap()
    //closes the window on load function
    // }



}

function weather(lat, lon) {  
    //Calling weather API
            var APIkey = "33600f0073ced31aaa6969ba360fc0d0";
    //POSSIBILITY EXISTS THAT THE LAT AND LONG ARE NOT PASSED
    //PUT IN AN IF THAT DOES THE FOLLOWING: if (typeof myVar != 'undefined')
      
        // var locationInput = $("").val().trim(); // <--- WHAT TO INPUT???? 
        // Use lat={lat}&lon={lon} for coordinates
        var QueryURL ="https://api.openweathermap.org/data/2.5/forecast?" + lat + "&" + lon  + "&units=imperial&appid=" + APIkey;
        console.log(QueryURL )
        $.ajax({
            url: QueryURL,
            method: 'GET'
        }).then(function(response){
            console.log(response, " is the weather");
            for (var i = 0; i < response.list.length; i++) {
                if (i%8 === 0) {
          
//  $("#displayParks").append("<div  id='temp'>" + response.list[i].main.temp + "</div><div id='wind'>" + response.list[i].wind.speed + "</div><div  id='humidity'>" + response.list[i].main.humidity + "</div>")
                //$("#weather").append(weatherDisplay(response, i))
                //console.log(weatherResponse(response, i))
                //response.list[i].main.temp
                var weatherDisp = $("<div>")

                var weatherP = $("<p>")
                weatherP.html("Date: " + response.list[i].dt_txt)
                weatherDisp.append(weatherP)


                var weatherP = $("<p>")
                weatherP.html("Temperature: " + response.list[i].main.temp)
                weatherDisp.append(weatherP)

                   

                var weatherP = $("<p>")
                weatherP.html("Wind Speed: " + response.list[i].wind.speed)
                weatherDisp.append(weatherP)


                var weatherP = $("<p>")
                weatherP.html("Humidity: " + response.list[i].main.humidity)
                weatherDisp.append(weatherP)
               

                var weatherP = $("<p>")
                weatherP.html("Description: " + response.list[i].weather[0].description)
                weatherDisp.append(weatherP)
                
                weatherDisp.css('display','inline-block')
                
                $("#weather").append(weatherDisp)
                // var weatherInput = (response.list[i].main.temp + response.list[i].wind.speed + response.list[i].main.humidity
                // <div id="temp"></div>
                
                // <div id="wind"></div>
                }
            }
            // <div id="temp"></div>
            // <div id="wind"></div>
            // <div id="humidity"></div> 

            getParksInfoByCode(parkCodeToPass)
        })

    }
    