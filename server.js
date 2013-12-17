var express = require('express');
var request = require('request');
var routes = require ('./helpers/routes.js');

var port = process.env.PORT || 3000;

var app = express();
app.use(express.bodyParser());
app.use(express.static(__dirname + '/client'));

// A simple logger
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

//     Routes        //
app.get('/', function(request, response){
  response.sendfile(__dirname + '/client/index.html');
});

app.get('/apilist', routes.list);
app.get("*", routes.api);
app.post('*', routes.api);

app.listen(port);
