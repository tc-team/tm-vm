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

	setTargetTitle: function(newTitle, longitude, latitude, username, callback) {
		targetModel.setTitle(newTitle, longitude, latitude, username, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	setTargetDescription: function(newDescription, longitude, latitude, username, callback) {
		targetModel.setDescription(newDescription, longitude, latitude, username, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	setTargetStatus: function(newStatus, longitude, latitude, username, callback) {
		targetModel.setStatus(newStatus, longitude, latitude, username, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	getTarget: function(longitude, latitude, username, callback) {
		targetModel.get(longitude, latitude, username, function(error, result) {
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