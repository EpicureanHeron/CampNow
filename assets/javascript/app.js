

//https://developer.nps.gov/api/v1/parks?stateCode=MN&api_key=N31BSTd4vcXAUWTFUb3FPdW4zBX1Jw3gVc5Sisw1


$(document).ready(function() {
    $("#submitButton").on("click", function(event) {
        event.preventDefault();
        
    // This line of code will grab the input from the textbox
       var where = $("#where").val().trim();
        $('#buttonInput').val('');
    // The movie from the textbox is then added to our array
        console.log(where)
    // Calling renderButtons which handles the processing of our movie array
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


$('body').on('click', '.clickable', function () {

    var parkCodeToPass = $(this).attr("parkCode");

    var fullNameToPass = $(this).attr("fullName");

    console.log(parkCodeToPass)

    $("#displayParks").empty();

    getParksInfoByCode(parkCodeToPass);
    googleMaps(fullNameToPass);
});

$("#displayParks").on('click', function () {

    // new Div to display weather, site img and amenities
    var ultScreen = $("<div>");
    // 5 day weather display
    var weatherDisp = $("<div>");
    // site image
    var campImg = $("<img>");
    // amenities info
    var amenities = $("<p>");
    // weather variable to display
    // weatherDisp.html(response.data[i]., Precip, Wind);
    // image of site from Google api
    // campImg.html(response.data[i].image);
    // information from NPS amenities api
    // amenities.html(response.data[i].data);
    // appending weatherDisp to ultScreen div
    ultScreen.append(weatherDisp);
    // appending site image to ultScreen div
    ultScreen.append(campImg);
    // appending amenities to ultScreen div
    ultScreen.append(amenities);
    // adding class to style weather display
    // weatherDisp.addclass("weather-display");

    // adding class to style weather display
    campImg.addClass("camp-display");
    // adding class to amenities paragraph
    amenities.addClass("amenities");

    $("#ultScreen").append(ultScreen)

});










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