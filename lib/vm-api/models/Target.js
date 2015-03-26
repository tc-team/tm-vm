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

	setTitle: function(newTitle, id, callback) {
		mysql.setTargetTitle(newTitle, id, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},
	
	setDescription: function(newDescription, id, callback) {
		mysql.setTargetDescription(newDescription, id, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	setStatus: function(newStatus, id, callback) {
		mysql.setTargetStatus(newStatus, id, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	setCoordinates: function(newLongitude,  newLatitude, id, callback) {
		mysql.setTargetCoordinates(newLongitude, newLatitude, id, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	get: function(id, callback) {
		mysql.getTarget(id, function(error, result) {
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