'use strict';

var targetModel = require('../models/Target');

var Target = {

	addTarget: function(title, longitude, latitude, description, status, username, callback) {
		targetModel.add(title, longitude, latitude, description, status, username,
			function(error, result) {
				if (error) {
					callback(error, null);
				} else {
					callback(null, result);
				}
		});
	},

	setTargetTitle: function(newTitle, id, callback) {
		targetModel.setTitle(newTitle, id, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	setTargetDescription: function(newDescription, id, callback) {
		targetModel.setDescription(newDescription, id, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	setTargetStatus: function(newStatus, id, callback) {
		targetModel.setStatus(newStatus, id, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	setTargetCoordinates: function(newLongitude, newLatitude, id, callback) {
		targetModel.setCoordinates(newLongitude, newLatitude, id, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	getTarget: function(id, callback) {
		targetModel.get(id, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	getAllTargets: function(username, callback) {
		targetModel.getAll(username, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	deleteTarget: function(id, callback) {
		targetModel.delete(id, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	}
}

module.exports = Target;