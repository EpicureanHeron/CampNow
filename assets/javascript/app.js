

//https://developer.nps.gov/api/v1/parks?stateCode=MN&api_key=N31BSTd4vcXAUWTFUb3FPdW4zBX1Jw3gVc5Sisw1

var parksBaseURL = "https://developer.nps.gov/api/v1/parks?";

var parksStateCode = "stateCode=MN";

var parksAPIKey = "&api_key=N31BSTd4vcXAUWTFUb3FPdW4zBX1Jw3gVc5Sisw1";

var parksAJAX = parksBaseURL + parksStateCode + parksAPIKey ;
  
  console.log(parksAJAX);
  //clears the gifs if there are some there

  
//this is the jquery ajax call
$.ajax({
  //takes the URL which is our queryURL
  url: parksAJAX,
  //magic method of GET (something something SERVER HTTP STUFF something something)
  method: "GET"
})
//happens after the promise above is fullfilled
  .then(function(response) {
     // console.log(response)
  });

  
  ///////GOOGLE MAPS STUFF///////
window.onload = function() {
  var map;
  var service;
  var infowindow;
  
  function initMap() {

    console.log("initMap TriggeredS")
   
   
    var request = {
      query: 'Museum of Contemporary Art Australia',
      fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],
    

  }
  service = new google.maps.places.PlacesService(document.createElement("div"));
  service.findPlaceFromQuery(request, callback);
}

  
  function callback(results, status) {
    console.log("callback TriggeredS")
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
 
        console.log(results[i]);
      }
    }
  }
  initMap()
}

// window.onload = function() {
// var map;
// var service;
// var infowindow;

// function initialize() {
//   var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
//   console.log("initialize!")
//   map = new google.maps.Map(document.getElementById('map'), {
//       center: pyrmont,
//       zoom: 15
//     });

//   var request = {
//     location: pyrmont,
//     radius: '500',
//     query: 'restaurant'
//   };

//   service = new google.maps.places.PlacesService(map);
//   service.textSearch(request, callback);
// }

// function callback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       var place = results[i];
//       createMarker(results[i]);

//       console.log(results[i])
//     }
//   }
// }
// }

{/* <div id="map"></div>


<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<!--Firebase-->
<script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>



 <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=<apikey>&libraries=places"></script>

<!--script-->
<script type="text/javascript" src="assets/javascript/app.js"></script>
<!--Google Maps Script--> */}
