'use strict';

var targetModel = require('../models/Target.js');

var Target = {

	addTarget: function(title, longtitude, latitude, description, status, username, callback) {
		targetModel.add(title, longtitude, latitude, description, status, username,
			function(error, result) {
				if (error) {
					callback(error, null);
				} else {
					callback(null, result);
				}
		});
	},

	setTargetTitle: function(newTitle, longtitude, latitude, username, callback) {
		targetModel.setTitle(newTitle, longtitude, latitude, username, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	setTargetDescription: function(newDescription, longtitude, latitude, username, callback) {
		targetModel.setDescription(newDescription, longtitude, latitude, username, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	setTargetStatus: function(newStatus, longtitude, latitude, username, callback) {
		targetModel.setStatus(newStatus, longtitude, latitude, username, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	getTarget: function(longtitude, latitude, username, callback) {
		targetModel.get(longtitude, latitude, username, function(error, result) {
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
				callback(null, error);
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