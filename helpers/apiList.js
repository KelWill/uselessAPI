var shadowfacts     = require('./api/shadowfacts.js');
var array           = require('./api/array.js');
var weather         = require('./api/weather.js');
var mathLikeMe      = require('./api/mathLikeMe.js');

exports.handler = {
  '/shadowfacts'                 : shadowfacts.handle,
  '/shadowfax'                   : shadowfacts.handle,
  '/shadow'                      : shadowfacts.handle,
  '/unsortmyarray'               : array.handle,
  '/mostlysort'                  : array.handle,
  '/antarcticweather'            : weather.handle,
  '/antarcticweather/all'        : weather.handle,
  '/antarcticweather/location'   : weather.handle,
  '/amiprime'                    : mathLikeMe.handle,
};

exports.list = {
  'shadowFacts': shadowfacts.apiEntry,
  'unsortmyarray': array.apiEntry,
  'antarcticWeather': weather.apiEntry,
  'mathLikeMe': mathLikeMe.apiEntry
};

