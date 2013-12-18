var shadowfacts     = require('./api/shadowfacts.js');
var array           = require('./api/array.js');
var weather         = require('./api/weather.js');
var mediocreCatPic  = require('./api/mediocreCatPics.js');
var advice          = require('./api/advice.js');
var date            = require('./api/date.js');
var helloworld      = require('./api/helloworld.js');

console.log(date.js);

exports.handler = {
  '/shadowfacts'                 : shadowfacts.handle,
  '/shadowfax'                   : shadowfacts.handle,
  '/shadow'                      : shadowfacts.handle,

  '/unsortmyarray'               : array.handle,
  '/mostlysort'                  : array.handle,
  '/sixthelementorkangaroo'      : array.handle,

  '/antarcticweather'            : weather.handle,
  '/antarcticweather/all'        : weather.handle,
  '/antarcticweather/location'   : weather.handle,
  '/antarcticweather/funfact'    : weather.handle,

  '/mediocrecatpic'              : mediocreCatPic.handle,

  '/amioutside'                  : advice.handle,
  '/almostrandomcointoss'        : advice.handle,
  '/alternatingcointoss'         : advice.handle,

  '/tomacaulayculkintime'        : date.handle,
  '/areweintheunixera'           : date.handle,
  '/onedayago'                   : date.handle,

  '/helloworld'                  : helloworld.handle
};

exports.list = {
  'shadowFacts'     : shadowfacts.apiEntry,
  'unsortmyarray'   : array.apiEntry,
  'antarcticWeather': weather.apiEntry,
  'dates'           : date.apiEntry,
  'helloworld'      : helloworld.apiEntry,
  'advice'          : advice.apiEntry
};

