const request = require('request');

const weather = (lat, long, callback) => {
 const url = `https://api.darksky.net/forecast/d34e3798be39ba22ad352aeb20bf1a61/${lat},${long}?units=si`;
 request(
  {
   url: url,
   json: true
  },
  (error, response) => {
   if (error) {
    callback(
     "Oops, can't connect to darksky. Check internet connection",
     undefined
    );
   } else if (response.body.length == 0) {
    callback("Unable to find location", undefined);
   } else {
    const data = response.body;
    //calls the currently object -can be changed to minutely/hourly etc.
    callback(data.currently);
   }
  }
 );
};

const geocode = (address, callback) => {
    const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoicm9ja2V0dG93biIsImEiOiJjanQ2ZmEyZnowZjloNDRtd2VtemR3dzZmIn0.JLgxwoeoCASsZ8WDYI3-5A`
    
    request({url: url, json: true}, (error, response) => {
        if (error){
            callback("oops, can't connect to mapbox. Check network connection", undefined)
        } else if (response.body.features.length == 0){
            callback('unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
      
    })
    }

geocode("Chester", (error, data) => {
    console.log("Error:", error);
    console.log(data);
    let lat = data.latitude;
    let long = data.longitude;
    weather(lat, long, (error, data) => {
      console.log("Error:", error);
      console.log("Data:", data);
    });
  });
  




