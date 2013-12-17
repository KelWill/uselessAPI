var shadowfacts     = require('./api/shadowfacts.js');
var array           = require('./api/array.js');
var weather         = require('./api/weather.js');

exports.handler = {
  '/shadowfacts'                 : shadowfacts.handle,
  '/shadowfax'                   : shadowfacts.handle,
  '/shadow'                      : shadowfacts.handle,
  '/unsortmyarray'               : array.handle,
  'mostlysort'                   : array.handle,
  '/antarcticweather'            : weather.handle,
  '/antarcticweather/all'        : weather.handle,
  '/antarcticweather/location'   : weather.handle
};

exports.list = {
  'shadowFacts': shadowfacts.apiEntry,
  'unsortmyarray': unsortmyarray.apiEntry,
  'antarcticWeather': weather.apiEntry
};

