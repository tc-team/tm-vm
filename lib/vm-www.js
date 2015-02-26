'use strict';

var express = require('express');
var app = express();
var config = require('../config');

app.use(express.static(__dirname + '/vm-www'));

app.start = function() {
	app.listen(config.web_server.port, config.web_server.host);
	console.log('Web server listening ' + config.web_server.host + ' on port ' + config.web_server.port);
};

module.exports = app;