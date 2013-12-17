var shadowfacts     = require('./api/shadowfacts.js');
var array           = require('./api/array.js');
var weather         = require('./api/weather.js');
var mediocreCatPic  = require('./api/mediocreCatPics.js');
var advice          = require('./api/advice.js');

exports.handler = {
  '/shadowfacts'                 : shadowfacts.handle,
  '/shadowfax'                   : shadowfacts.handle,
  '/shadow'                      : shadowfacts.handle,
  '/unsortmyarray'               : array.handle,
  '/mostlysort'                  : array.handle,
  '/antarcticweather'            : weather.handle,
  '/antarcticweather/all'        : weather.handle,
  '/antarcticweather/location'   : weather.handle,
  '/antarcticweather/funfact'    : weather.handle,
  '/mediocrecatpic'              : mediocreCatPic.handle,
  '/shouldItakeAshot'            : advice.handle,
  '/amIoutside'                  : advice.handle,
  '/almostRandomCoinToss'        : advice.handle
};

exports.list = {
  'shadowFacts'     : shadowfacts.apiEntry,
  'unsortmyarray'   : array.apiEntry,
  'antarcticWeather': weather.apiEntry
};

