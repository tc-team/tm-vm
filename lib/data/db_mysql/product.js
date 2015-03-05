'use strict';

var config = require('../../../config').mysql;
var mysql      = require('mysql');
var connection = mysql.createConnection(config);

connection.connect();

exports.addProduct = function (name, number, username, callback) {
  var queryString = 'INSERT INTO `product` (`name`, `number`, `username`) VALUES ("' + name + '","' + number + '", "' + username + '")';
	connection.query(queryString, function (error, result) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
    return;
	});
};

exports.getProduct = function (name, username, callback) {
  var queryString = 'SELECT * FROM `product` WHERE `username` = "' + username + '" AND `name` = "' + name + '"';
	connection.query(queryString, function (error, rows) {
    if (error) {
    	callback(error, null);
    } else {
    	callback(null, rows);
    }
    return;
	});
};

exports.setProduct = function (name, number, username, callback) {
  var queryString = 'UPDATE `product` SET `number` ="' +  number + '" WHERE `username` = "' + username + '" AND name = "' + name + '"';
  connection.query(queryString, function (error, result) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
    return;
  });
};

exports.deleteProduct = function (username, callback) {
  var queryString = 'DELETE FROM `product` WHERE `username` = "' + username + '"';
	connection.query(queryString, function (error, result) {
    if (error) {
    	callback(error, null);
    } else {
      callback(null, result);
    }
    return;
	});
};