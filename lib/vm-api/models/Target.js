'use strict';

var mysql = require('../../data/db_mysql/mysqlHelper.js');

var Target = {
	
	add: function(title, longtitude, latitude, description, status, username, callback) {
		var sql = 'INSERT INTO `target` (`title`, `longtitude`, `latitude`, `description`, `status`, 
			`username`) VALUES ("' + title + '","' + longtitude + '","' + latitude + '","'
			 + description + '","' + status + '","' + username + '")';
		mysql.queryMysql(sql, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	set: function(newTitle, newDescription, newStatus, longtitude, latitude, username, callback) {
		var sql = 'UPDATE `target` SET `title` ="' + newTitle + '", `description` ="' + newDescription + '", 
			`status` ="' + newStatus + '" WHERE `longtitude` ="' + longtitude + '" AND `latitude` ="'
			 + long'" AND `username` ="' + username + '"';
		mysql.queryMysql(sql, function(error, result) {
			if (error) {
				callback(error, null;
			} else {
				callback(null, result);
			}
		});
	},
	
	get: function(longtitude, latitude, username, callback) {
		var sql  = 'SELECT * FROM `target` WHERE `username` ="' + username + '" AND `longtitude` ="' 
			+ longtitude + '" AND latitude =' + latitude + '"';
		mysql.queryMysql(sql, function(error, rows) {
			if (error) {
				callback(error, null);
			} else {
				callback(null ,rows);
			}
		});
	}, 

	getAll: function(username, callback) {
		var status = true;
		var sql = 'SELECT * FROM `target` WHERE `username` ="' + username + '" OR `status` ="'
			+ status + '"';
		mysql.queryMysql(sql, function(error, rows) {
			if (error) {
				callback(error, null);
			} else {
				callback(null ,rows);
			}
		});
	},

	delete: function(username, id, callback) {
		var sql = 'DELETE FROM `target` WHERE `username` ="' + username +'" AND `id` ="' + id + '"';
		mysql.queryMysql(sql, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	deleteAll: function(username, callback) {
		clientDb.connectDb();
		var sql = 'DELETE FROM `target` WHERE `username` ="' + username'"';
		mysql.queryMysql(sql, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	}
};

module.exports = Target;