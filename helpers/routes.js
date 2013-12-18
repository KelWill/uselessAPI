var express = require('express');
var apiList = require('./apiList.js');

exports.list = function(request, response){
  response.send(apiList.list);
};

exports.api = function(request, response){
  apiList.handler[request.url.toLowerCase()](request, response);
};
