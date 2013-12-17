var http = require('http');

wundergroundKey = process.env.WUNDERGROUND_KEY || '6583491dcf642ab3';

var wundergroundUrl = "api.wunderground.com";
var path =  '/api/' + wundergroundKey + '/geolookup/conditions/q/Antarcica/';
exports.handle = function(request, response){
};

var weatherInfo = {};
var cities = ['Cape_Phillips', 'Clean_Air', 'Uranus', 'Base_Esperanza'];
var getWeather = function(){
  var counter = 0;
  for (var i = 0; i < cities.length; i++){
    var request = http.request({
      host: wundergroundUrl,
      path:  path + cities[i] + '.json',
      method: "GET"
    }, function(response){
      var weather = '';
      response.on('data', function(chunk){
        weather+=chunk;
      });
      response.on('end', function(){
        console.log('weather is running');
        weather = JSON.parse(weather);
        for (var key in weather.results){
          console.log(key);
          for (var key2 in weather.response[key]){
            console.log(key2);
          }
        }
        // console.log((weather.response.features.conditions));
        // console.log(weather.response.features.conditions.weather);
      });
    });
    request.end();
  }
};

getWeather();


//current_observation
//weather
//temperature_string
//wind_string

// display_location[full]