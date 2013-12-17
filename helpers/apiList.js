var shadowfacts     = require('./api/shadowfacts.js');
var unsortmyarray   = require('./api/unsortmyarray.js');
var weather         = require('./api/weather.js');

exports.handler = {
  '/shadowfacts'          : shadowfacts.handle,
  '/shadowfax'            : shadowfacts.handle,
  '/shadow'               : shadowfacts.handle,
  '/unsortmyarray'        : unsortmyarray.handle,
  '/antarticweather'      : weather.handle,
  '/antarcticweather/all' : weather.handle,
  '/antarcticweather/location'   : weather.handle
};

exports.list = {
  'shadowFacts': shadowfacts.apiEntry,
  'unsortmyarray': unsortmyarray.apiEntry,
  'antarcticWeather': weather.apiEntry
};

