var shadowfacts     = require('./api/shadowfacts.js');
var unsortmyarray   = require('./api/unsortymyarray.js');

exports.module.handler = {
  '/shadowfacts'   : shadowfacts.handle,
  '/shadowfax'     : shadowfacts.handle,
  '/shadow'        : shadowfacts.handle,
  '/unsortmyarray' : unsortarray.handle
};

exports.module.list = {
  'shadowFacts': shadowfacts.apiEntry,
  'unsortmyarray': unsortymyarray.apiEntry

};


