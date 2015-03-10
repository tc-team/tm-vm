'use strict';

var mysql = require('../../data/db_mysql/target');

var Target = {
	
	add: function(title, longitude, latitude, description, status, username, callback) {
		mysql.addTarget(title, longitude, latitude, description, status, username,
			function(error, result) {
				if (error) {
					callback(error, null);
				} else {
					callback(null, result);
				}
		});
	},

	setTitle: function(newTitle, longitude, latitude, username, callback) {
		mysql.setTargetTitle(newTitle, longitude, latitude, username, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},
	
	setDescription: function(newDescription, longitude, latitude, username, callback) {
		mysql.setTargetDescription(newDescription, longitude, latitude, username, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	setStatus: function(newStatus, longitude, latitude, username, callback) {
		mysql.setTargetStatus(newStatus, longitude, latitude, username, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	get: function(longitude, latitude, username, callback) {
		mysql.getTarget(longitude, latitude, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	}, 

	getAll: function(username, callback) {
		mysql.getAllTargets(username, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	delete: function(id, callback) {
		mysql.deleteTarget(id, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	deleteAll: function(username, callback) {
		mysql.deleteAllTargets(username, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	}
};

module.exports = Target;