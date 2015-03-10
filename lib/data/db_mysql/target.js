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

exports.setTargetTitle = function(newTitle, id, callback) {
	var sql = 'UPDATE `target` SET `title` ="' + newTitle + '" WHERE `id` ="' + id + '"';
	connection.query(sql, function(error, result) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
};

exports.setTargetDescription = function(newDescription, id, callback) {
	var sql = 'UPDATE `target` SET `description` ="' + newDescription + '" WHERE `id` ="' + id + '"';
	connection.query(sql, function(error, result) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
};

exports.setTargetStatus = function(newStatus, id, callback) {
	var sql = 'UPDATE `target` SET `status` ="' + newStatus + '" WHERE `id` ="' + id + '"';
	connection.query(sql, function(error, result) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
};

exports.setTargetLongitude = function(newLongitude, id, callback) {
	var sql = 'UPDATE `target` SET longitude ="' + longitude + '" WHERE `id` ="' + id + '"';
	connection.query(sql, function(error, result) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
};

exports.setTargetLatitude = function(newLatitude, id, callback) {
	var sql = 'UPDATE `target` SET latitude ="' + latitude + '" WHERE `id ` ="' + id + '"';
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
	connection.query(sql, function(error, result) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
};