var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var expressSession = require('express-session');
var sharedsession = require('express-socket.io-session');

var port = 8081;

var app = express();
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var httpServer = http.Server(app);

var io = require('socket.io').listen(httpServer);

// Save our IO object in socket manager.
var socketManager = require('./socketManager.js');
socketManager.setIo(io);

//app.js shall use the controllers from controller.js
var router = require('./controller.js');
app.use('/API', router);


httpServer.listen(port, function () {
  console.log("server listening on port", port);
});
