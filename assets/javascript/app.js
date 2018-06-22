

//https://developer.nps.gov/api/v1/parks?stateCode=MN&api_key=N31BSTd4vcXAUWTFUb3FPdW4zBX1Jw3gVc5Sisw1

var parksBaseURL = "https://developer.nps.gov/api/v1/parks?"

var parksStateCode = "stateCode=MN"

var parksAPIKey = "&api_key=N31BSTd4vcXAUWTFUb3FPdW4zBX1Jw3gVc5Sisw1"

var parksAJAX = parksBaseURL + parksStateCode + parksAPIKey 
  
  console.log(parksAJAX)
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
      console.log(response)
  })