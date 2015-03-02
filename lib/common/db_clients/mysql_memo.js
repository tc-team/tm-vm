'use strict';

var config = require('../../../config').mysql;
var mysql      = require('mysql');
var connection = mysql.createConnection(config);

connection.connect();

exports.addMemo = function (id, name, pathToFile, username, callback) {
  var queryString = 'INSERT INTO `memo` (`id`, `name`, `pathToFile`, `username`) VALUES ("' + id + '", "' + name + '", "' + pathToFile + '", "' + username + '")';
	connection.query(queryString, function (error, result) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
    return;
	});
};

exports.getAllMemos = function (username, callback) {
  var queryString = 'SELECT * FROM `memo` WHERE `username` = "' + username + '"';
	connection.query(queryString, function (error, rows) {
    if (error) {
    	callback(error, null);
    } else {
    	callback(null, rows);
    }
    return;
	});
};

exports.setMemo = function (id, newName, username, callback) {
  var queryString = 'UPDATE `memo` SET `name` ="' + newName + '" WHERE `id` = "' + id + '" AND `username` = "' + username + '"';
  connection.query(queryString, function (error, result) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
    return;
  });
};

exports.deleteMemo = function (id, username, callback) {
  var queryString = 'DELETE from `memo` WHERE `id` = "' + id + '" AND `username` = "' + username + '"';
	connection.query(queryString, function (error, result) {
    if (error) {
    	callback(error, null);
    } else {
      callback(null, result);
    }
    return;
	});
};

exports.deleteAllMemos = function (username, callback) {
  var queryString = 'DELETE from `memo` WHERE `username` = "' + username + '"';
  connection.query(queryString, function (error, result) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
    return;
  });
};