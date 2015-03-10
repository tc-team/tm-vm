'use strict';

var config  = require('../../../config/').mysql;
var mysql = require('mysql');
var connection = mysql.createConnection(config);

connection.connect();
	
exports.addTarget = function(title, longitude, latitude, description, status, username, callback) {
	var sql = 'INSERT INTO `target` (`title`, `longitude`, `latitude`, `description`, `status`, `username`) \
	VALUES ("' + title + '", "' + longitude + '", "' + latitude + '", "' + description + '","' + status + '","' + username + '")';
	
	connection.query(sql, function(error, result) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
}; 
	
exports.getTarget = function(longitude, latitude, username, callback) {
	var sql  = 'SELECT * FROM `target` WHERE `username` ="' + username + '" AND `longitude` ="' 
		+ longitude + '" AND latitude =' + latitude + '"';
	connection.query(sql, function(error, rows) {
		if (error) {
			callback(error, null);
		} else {
			callback(null ,rows);
		}
	});
}; 

exports.setTargetTitle = function(newTitle, longitude, latitude, username, callback) {
	var sql = 'UPDATE `target` SET `title` ="' + newTitle + '" WHERE `longitude` ="' 
		+ longitude + '" AND `latitude` ="' + latitude + '" AND `username` ="' + username + '"';
	connection.query(sql, function(error, result) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
};

exports.setTargetDescription = function(newDescription, longitude, latitude, username, callback) {
	var sql = 'UPDATE `target` SET `description` ="' + newDescription + '" WHERE `longitude` ="' 
		+ longitude + '" AND `latitude` ="' + latitude + '" AND `username` ="' + username + '"';
	connection.query(sql, function(error, result) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
};

exports.setTargetStatus = function(newStatus, longitude, latitude, username, callback) {
	var sql = 'UPDATE `target` SET `status` ="' + newStatus + '" WHERE `longitude` ="' 
		+ longitude + '" AND `latitude` ="' + latitude + '" AND `username` ="' + username + '"';
	connection.query(sql, function(error, result) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
};
	
exports.getAllTargets = function(username, callback) {
	var status = true;
	var sql = 'SELECT * FROM `target` WHERE `username` ="' + username + '" OR `status` ="' + status + '"';
	connection.query(sql, function(error, rows) {
		if (error) {
			callback(error, null);
		} else {			
			callback(null, rows);
		}
	});
};

exports.deleteTarget = function(id, callback) {
	var sql = 'DELETE FROM `target` WHERE `id` ="' + id + '"';
	connection.query(sql, function(error, result) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
};

exports.deleteAllTargets = function(username, callback) {
	var sql = 'DELETE FROM `target` WHERE `username` ="' + username + '"';
	connection.queryMysql(sql, function(error, result) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
};