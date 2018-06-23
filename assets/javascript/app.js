

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
    parksAPICall(where)
    googleMaps(where)
    });
})





  
  
  //clears the gifs if there are some there



  
//this is the jquery ajax call
function parksAPICall(locationQuery){

    
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
         console.log("this is the NPS API Response:")
         console.log(response)
    });
}

function googleMaps(queryCaptured) {
    
    ///////GOOGLE MAPS STUFF///////
    // window.onload = function() {
    var map;
    var service;
    var infowindow;
    
    function initMap() {

        console.log("initMap Triggered")
    
        var queryToUse = "National Parks near" + queryCaptured

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
        console.log(status)
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