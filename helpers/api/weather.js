var http = require('http');

wundergroundKey = process.env.WUNDERGROUND_KEY;

var wundergroundUrl = "api.wunderground.com";
var path =  '/api/' + wundergroundKey + '/geolookup/conditions/q/Antarcica/';
exports.handle = function(request, response){
  if (request.url === '/antarcticweather/all'){
    response.send(weatherInfo);
  } else if (request.url === '/antarctic/location'){
    var place = cities[~~(Math.random() * cities.length)];
    return place.replace(/_/g, ' ');
  } else {
    var keys = Object.keys(weatherInfo);
    var key = keys[~~(Math.random()*keys.length)];
    var data = weatherInfo[key];
    var result = "In " + key + " it is " + data.temp + ', the wind is ' + data.wind[0].toLowerCase() + data.wind.slice(1) +
      '. Additional info: ' + data.conditions[0].toLowerCase() + data.conditions.slice(1);
    response.send(result);
  }
};
var cities = ["Ago-5", "Ago-6", "Amery_Ice_Shelf", "Amundsen-Scott", "Base_Arturo_Prat", "Base_Baia_Terra_Nova", "Base_Belgrano", "Base_Bernardo_O'Higgins", "Base_Esperanza", "Base_Jubany", "Base_Marambio", "Base_Orcadas", "Base_San_Martin", "Bellingshausen", "Butler_Island", "Cape_Phillips", "Cape_Ross", "Casey_66.28S_110.52E", "Casey_66.72S_112.93E", "Casey_68.40S_112.22E", "Casey_68.50S_102.18E", "Casey_71.60S_111.27E", "Casey_Airstrip", "Centro_MET.ANTARTICO", "Clean_Air", "D-47_(UNIV._Wi_Id_8916)", "Davis_68.58S_77.97E", "Davis_73.45S_76.78E", "Davis_76.05S_65.02E", "Dinamet-Uruguay", "Dome_C", "Dumont_D'Urville", "Elaine", "Ferrell", "Fossil_Bluff", "Gill", "Great_Wall", "Halley", "Henry", "King_Sejong", "Larsen_Ice", "Lettau", "Linda", "Maitri", "Manuela", "Marble_Point", "Mawson_67.60S_62.87E", "Mawson_68.65S_61.12E", "Mawson_71.28S_59.22E", "Mawson_73.83S_55.67E", "McMurdo", "Minna_Bluff", "Mirnyj", "Mount_Siple", "Neumayer", "Nico", "Novolazarevskaja", "Palmer_Station", "Possession_Island", "Racer_Rock", "Rothera_Point", "S.A.N.A.E.", "Schwerdtfeger", "Siple_Dome", "Syowa", "Troll", "UNIV._Wi_Id_21356", "UNIV._Wi_Id_21358", "UNIV._Wi_Id_8917", "UNIV._Wi_Id_8918", "UNIV._Wi_Id_8925", "UNIV._Wi_Id_8929", "Uranus", "Vernadsky", "Vostok", "Williams_Field", "Zhongshan"];

var weatherInfo = {};
var getWeather = function(start, end){
  for (var i = start; i < end; i++){
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
        if (weather){
          weather = JSON.parse(weather);
          console.log(weather);
          if (weather.display_location){
            weatherInfo[weather.display_location.full] = {};
            var cityWeather = weatherInfo[weather.display_location.full];
            cityWeather.temp = weather.current_observation.temperature_string;
            cityWeather.conditions = weather.current_observation.weather;
            cityWeather.wind = weather.current_observation.wind_string;
          }
        }
      });
    });
    request.end();
  }
  // To avoid going over my wunderground limit
  if (end < cities.length){
    if (end + 4 < cities.length){
      end = end + 4;
    } else {
      end = cities.length;
    }
    start = start + 4;
    // setTimeout(function(){
    //   getWeather(start, end);
    // }, 3 * 60000);
  } else {
    start = 0;
    end = 4;
  }
};

getWeather(0, 3);

//Updates every four hours to stay under limit
setInterval(function(){
  weatherInfo = {};
  getWeather(0, 4);
}, 3600000 * 4);


exports.apiEntry = {
  title: 'Antarctic Weather',
  routes: [
    {
      url: '/antarcticweather',
      shortDescription: 'Gives weather for random location in string format.'
    },
    {
      url: '/antarticweather/all',
      shortDescription: 'Gives weather for all locations we have information on in JSON format.'
    },
    {
      url: '/antarcticweather/location',
      shortDescription: 'Returns the name of a location in Antarctica. Wow your friends with your knowledge!'
    }
  ],
  description: 'Provides weather information for random locations in Antarctica. Weather information is updated hourly, ' +
  'but for some locations, weather information provided is only an estimate.'
};
