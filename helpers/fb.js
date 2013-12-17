var firebase = require('firebase');

var rootRef = new firebase('https://uselessapi.firebaseio.com/');
var weather = rootRef.child('weather');
var catPics = rootRef.child('catPics');

exports.rootRef = rootRef;
exports.weather = weather;