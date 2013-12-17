var http = require('http');

wundergroundKey = process.env.WUNDERGROUND_KEY;

var wundergroundUrl = "api.wunderground.com";
var path =  '/api/' + wundergroundKey + '/geolookup/conditions/q/Antarcica/';
var cities = ["Ago-5", "Ago-6", "Amery_Ice_Shelf", "Amundsen-Scott", "Base_Arturo_Prat", "Base_Baia_Terra_Nova", "Base_Belgrano", "Base_Bernardo_O'Higgins", "Base_Esperanza", "Base_Jubany", "Base_Marambio", "Base_Orcadas", "Base_San_Martin", "Bellingshausen", "Butler_Island", "Cape_Phillips", "Cape_Ross", "Casey_66.28S_110.52E", "Casey_66.72S_112.93E", "Casey_68.40S_112.22E", "Casey_68.50S_102.18E", "Casey_71.60S_111.27E", "Casey_Airstrip", "Centro_MET.ANTARTICO", "Clean_Air", "D-47_(UNIV._Wi_Id_8916)", "Davis_68.58S_77.97E", "Davis_73.45S_76.78E", "Davis_76.05S_65.02E", "Dinamet-Uruguay", "Dome_C", "Dumont_D'Urville", "Elaine", "Ferrell", "Fossil_Bluff", "Gill", "Great_Wall", "Halley", "Henry", "King_Sejong", "Larsen_Ice", "Lettau", "Linda", "Maitri", "Manuela", "Marble_Point", "Mawson_67.60S_62.87E", "Mawson_68.65S_61.12E", "Mawson_71.28S_59.22E", "Mawson_73.83S_55.67E", "McMurdo", "Minna_Bluff", "Mirnyj", "Mount_Siple", "Neumayer", "Nico", "Novolazarevskaja", "Palmer_Station", "Possession_Island", "Racer_Rock", "Rothera_Point", "S.A.N.A.E.", "Schwerdtfeger", "Siple_Dome", "Syowa", "Troll", "UNIV._Wi_Id_21356", "UNIV._Wi_Id_21358", "UNIV._Wi_Id_8917", "UNIV._Wi_Id_8918", "UNIV._Wi_Id_8925", "UNIV._Wi_Id_8929", "Uranus", "Vernadsky", "Vostok", "Williams_Field", "Zhongshan"];
var weatherInfo = {};

exports.handle = function(request, response){
  if (request.url === '/antarcticweather/all'){
    response.send(weatherInfo);
  } else if (request.url === '/antarcticweather/location'){
    var place = cities[~~(Math.random() * cities.length)];
    response.send(place.replace(/_/g, ' '));
  } else {
    var keys = Object.keys(weatherInfo);
    var key = keys[~~(Math.random()*keys.length)];
    var data = weatherInfo[key];
    data.temp = data.temp || "probably really cold";
    data.wind = data.wind || "chilling";
    if (!data.conditions){
      data.conditions = coolFacts[~~(Math.random()*coolFacts.length)];
    }
    var result = "In " + key + " it is " + data.temp + ', the wind is ' + data.wind[0].toLowerCase() + data.wind.slice(1) +
      '. Additional info: ' + data.conditions[0].toLowerCase() + data.conditions.slice(1);
    response.send(result);
  }
};
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
        console.log(weather);
        console.log(typeof weather);
        console.log(response.body);
        if (weather){
          weather = JSON.parse(weather);
          if (weather.current_observation && weather.current_observation.display_location){
            var cityWeather = {};
            cityWeather.temp = weather.current_observation.temperature_string;
            cityWeather.conditions = weather.current_observation.weather;
            cityWeather.wind = weather.current_observation.wind_string;
            weatherInfo[weather.current_observation.display_location.full] = cityWeather;
            console.log('weatherInfo', weatherInfo);
            console.log('cityWeather', cityWeather);
          }
        }
      });
    });
    request.end();
  }
  // To avoid going over my wunderground limit
  if (end < cities.length){
    if (end + 5 < cities.length){
      end = end + 5;
    } else {
      end = cities.length;
    }
    start = start + 5;
    // setTimeout(function(){
    //   getWeather(start, end);
    // }, 3 * 60000);
  } else {
    start = 0;
    end = 5;
  }
};

getWeather(0, 5);

//Updates every four hours to stay under limit
setInterval(function(){
  getWeather(0, 5);
}, 3600000 * 4);


exports.apiEntry = {
  title: 'Antarctic Weather',
  routes: [
    {
      url: '/antarcticweather',
      shortDescription: 'Gives weather for random location in string format.'
    },
    {
      url: '/antarcticweather/all',
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

var coolFacts = ["If you're naked, this isn't a good place for you.",
  "Good news! You don't have to worry about polar bears!",
  "There are no land mammals in Antarcica.",
  "The only thing you have to fear is fear itself.",
  "Leopard seals don't feel fear, only hunger.",
  "Antarctica has the highest average elevation of all the continents",
  "The Antarctic Treaty was signed in 1959 by 12 countries; to date, 49 countries have signed the treaty.",
  "Antarctica has no indigenous population and there is no evidence that it was seen by humans until the 19th century.",
  "The first person to sail single-handedly to Antarctica was the New Zealander David Henry Lewis, in 1972, in a 10-metre steel sloop Ice Bird. New Zealanders are crazy",
  "About 98% of Antarctica is covered by the Antarctic ice sheet, a sheet of ice averaging at least 1.6 km (1.0 mi) thick.",
  "The coldest natural temperature ever recorded on Earth was −89.2 °C (−128.6 °F) at the Soviet (now Russian) Vostok Station in Antarctica on 21 July 1983",
  "This ozone hole covers almost the whole continent and was at its largest in September 2008, when the longest lasting hole on record remained until the end of December",
  "Antarctica's ice presently stores around 70% of the world's fresh water.",
  "An ice sheet covers all but 2.4 percent of Antarctica's 14 million square kilometers.",
  "At its thickest point the ice sheet is 4,776 meters deep and averages 2, 160 meters thick. This is 90 percent of all the world's ice and it is 70 percent of all the world's fresh water.",
  "There are lots of penguins, whales, seals, krill (the main food for whales), and even fish in Antarctica's waters, but there are no land mammals and, as far as scientists know, no native peoples.",
  "Eskimos and polar bears are found in the Arctic, not the Antarctic.",
  "The mean annual temperature at the South Pole is minus 56 degrees F. During the Austral Summer, temperatures at McMurdo base, on the Ross Sea, may get as high as 40 degrees F, while at the South Pole, at the Amundsen- Scott station, temperatures may reach 0 degrees F.", 
  "The area below 60 degrees south enjoys one long day and one long night each year. The sun sets in March and rises in October.",
  "The seasons in Antarctica are the opposite of the seasons in the Northern hemisphere--summer is October through February. Winter is March through September.",
  "The continent is roughly 14 million square kilometers (5.4 million square miles). The USA is only 9.36 million square kilometers (3.6 million square miles). The distance from Washington, D.C. to McMurdo station is approximately 14,830 kilometers, or 9,920 miles.",
  "Scientists work on all kinds of unique projects in Antarctica, including penguins, Antarctic cod (they have a special antifreeze agent in their blood!), whales, seals, global warming, climatology, meteorites, glaciology, astronomy, volcanoes, UV radiation, and more. Scientists also study humans in Antarctica, doing research on how the human body adapts to cold and how the human mind and heart react to extreme isolation.",
  "The Antarctic continent wasn't even actually seen until 1820. No man set foot in Antarctica until 1895. The first human landing there is claimed by Henryk Bull, with a party from a whaling ship. They landed at Cape Adare . It was 1935 before the first woman set foot there. Her name was Catherine Mikkelson, and she was the wife of a Norwegian whaling captain. The South Pole was first reached by a Norwegian named Roald Amundsen in 1911, and shortly after by British explorer Robert Scott.",
  "Most tourists who visit Antarctica visit the Antarctic Peninsula, which is accessible from Chile. There the climate is mild in comparison with the rest of the continent, and is teaming with wildlife. This part of Antarctica is sometimes called the \"Banana Belt.\"",
  "All warm-blooded animals living on and around Antarctica--whales, seals, sea birds, penguins--rely on thick layers of blubber to insulate them from the cold. The layer of blubber on a Weddell seal can be up to 4 inches thick.",
  "Only one warm-blooded animal remains on the Antarctic continent during the bitter winter--the emperor penguin. Emperor penguin females lay one egg in June and leave to spend the winter at sea. The male penguins stay on land all winter, surviving the most extreme conditions for nine weeks (including no food!), keeping their one egg warm by balancing it on their feet and covering it with a flap of abdominal skin. The females return just about the time the eggs hatch.",
  "Plants grow in Antarctica in ice-free regions (only about 2 percent of the continent is ice-free). Lichens and moss grow in any favorable niche, including in sand, soil, rock and on the weathered bones and feathers of dead animals. Algae also grows in Antarctica.",
  "Fifty million years ago Antarctica had a temperate climate, evergreen forests and many more kinds of animals than it has today. As the icecap slowly formed, most of the animals that lived there in ancient times were obliterated. Evidence of this once warm climate is in the fossils of plants, including fossil ferns, found by scientists.", 
  "Only invertebrate animals live on the continent year-round. The largest invertebrate that makes its home permanently in Antarctica is a wingless midge called Beligica antarctica. It is so tiny it can only be seen well under a microscope.",
  "One of the most important animals in the seas around Antarctica is the krill, a tiny crustacean that is the main food source for baleen whales, crabeater seals, fur seals and Adelie penguins. Krill are crucial to the health and ecological balance of all the world's oceans.",
  "There are many different species of penguins in Antarctica, including the huge and colorful emperor penguin, the smaller Adelie, the gentoo, the chinstrap penguin, the rockhopper, the king, the macaroni and more. In all there are 21 species of penguin scattered throughout the southern hemisphere.", 
  "Penguins are great swimmers. They can swim so fast, if they're trying, for instance, to escape the jaws of a leopard seal, that they can shoot out of the water 7 feet into the air onto a safe ice floe.",
  "Seals in Antarctic waters include the Weddell seal, the Ross seal, the crabeater, and the leopard seal. On the Antarctic peninsula there are also elephant seals and fur seals. These southern seals are still recovering from the devastation wrought by the 19th century sealers.",
   "Six species of baleen whales and six species of toothed whales and dolphins are found in Antarctic waters. They include the blue, fin, southern right whale, sei whale, minke, and humpback; the sperm whale, killer whale, hourglass dolphin, fourtooth whale, rightwhale dolphin and the southern bottlenose whale.", 
   "Penguins are the group of Antarctic birds that everyone thinks of first, but there are actually more petrels than there are penguins! Petrels include albatrosses, fulmars, prions, shearwaters, storm petrels, diving petrels and Gadfly petrels. Petrels are found in all the world's oceans, but there are more in Antarctic waters than anywhere else.", 
   "Other birds that live in or breed in Antarctica include cormorants, gulls, skuas and terns and land birds including sheathbills and pintail ducks."
  ];


