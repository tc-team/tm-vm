'use strict';

var mysql = require('../../data/db_mysql/target');

var Target = {
	
	add: function(title, longtitude, latitude, description, status, username, callback) {
		mysql.addTarget(title, longtitude, latitude, description, status, username,
			function(error, result) {
				if (error) {
					callback(error, null);
				} else {
					callback(null, result);
				}
		});
	},

	setTitle: function(newTitle, longtitude, latitude, username, callback) {
		mysql.setTargetTitle(newTitle, longtitude, latitude, username, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},
	
	setDescription: function(newDescription, longtitude, latitude, username, callback) {
		mysql.setTargetDescription(newDescription, longtitude, latitude, username, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	setStatus: function(newStatus, longtitude, latitude, username, callback) {
		mysql.setTargetStatus(newStatus, longtitude, latitude, username, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	get: function(longtitude, latitude, username, callback) {
		mysql.getTarget(longtitude, latitude, function(error, result) {
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
				console.log('model', result);
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