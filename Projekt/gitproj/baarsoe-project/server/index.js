var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

var port = 8080;

var server = express();
server.use(express.static(__dirname + '/../client'));
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

var httpServer = http.Server(server);

//server.js shall use the controllers from controller.js
var router = require('./serverControllers.js');
server.use('/API', router);


httpServer.listen(port, function () {
  console.log("server listening on port", port);
});
