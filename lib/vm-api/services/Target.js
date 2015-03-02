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

	setTarget: function(title, description, status, longtitude, latitude, username, callback) {
		targetModel.set(title, description, status, longtitude, latitude, username, 
			function(error, result) {
				if (error) {
					callback(error, null);
				} else {
					callback(null, result);
				}
		});
	},

	getTarget: function(longtitude, latitude, username, callback) {
		targetModel.get(longtitude, latitude, username, function(error, rows) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, rows);
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

	deleteTarget: function(id, username, callback) {
		targetModel.delete(id, username, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	}
}

module.exports = Target;