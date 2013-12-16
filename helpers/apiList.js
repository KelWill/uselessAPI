var shadowfacts     = require('./api/shadowfacts.js');
var unsortmyarray   = require('./api/unsortmyarray.js');

exports.handler = {
  '/shadowfacts'   : shadowfacts.handle,
  '/shadowfax'     : shadowfacts.handle,
  '/shadow'        : shadowfacts.handle,
  '/unsortmyarray' : unsortmyarray.handle
};

exports.list = {
  'shadowFacts': shadowfacts.apiEntry,
  'unsortmyarray': unsortmyarray.apiEntry
};

