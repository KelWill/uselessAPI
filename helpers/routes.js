var apiList = require('./apiList.js');

exports.module.main = function(request, response){
  response.sendfile('index.html');
};

exports.module.list = function(request, response){
  response.send(apiList.list);
};

exports.module.api = function(request, response){
  apiList.list[request.url](request, response);
};
