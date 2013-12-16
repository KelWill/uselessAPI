var express = require('express');
var request = require('request');
var routes = require ('./helpers/routes.js');

var port = process.env.PORT || 3000;

var app = express();
app.use(express.bodyParser());
app.use(express.static('client'));

//     Routes        //
app.get('/', routes.main);
app.get('/apilist', routes.list);
app.get("*", routes.api);

app.listen(port);
