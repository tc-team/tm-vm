'use strict';

var config = require('../../../config').mysql;
var mysql      = require('mysql');
var connection = mysql.createConnection(config);

connection.connect();

exports.getPrice = function (name, callback) {
  var queryString = 'SELECT `product_price` FROM `price` WHERE `product_name` = "' + name + '"';
	connection.query(queryString, function (error, rows) {
    if (error) {
    	callback(error, null);
    } else {
    	callback(null, rows);
    }
    return;
	});
};