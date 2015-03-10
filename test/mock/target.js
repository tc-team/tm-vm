'use strict';

var Target = {

	add: function(title, longtitude, latitude, description, status, username, callback) {
		var result = 1;
		return callback(null, result);
	},

	setTitle: function(newTitle, longtitude, latitude, username, callback) {
		return callback(null, 1);
	},

	setDescription: function(newDescription, longtitude, latitude, username, callback) {
		return callback(null, 1);
	},

	setStatus: function(newStatus, longtitude, latitude, username, callback) {
		return callback(null, 1);
	},

	get: function(longtitude, latitude, username, callback) {
		var result = [{
			title: 'title',
			longtitude: longtitude,
			latitude: latitude,
			description: 'description',
			staus: 'false',
			username: username
		}];
		return callback(null, result);
	},

	getAll: function(longtitude, latitude, username, callback) {
		var result = [{
			title: 'title',
			longtitude: longtitude,
			latitude: latitude,
			description: 'description',
			staus: 'false',
			username: username
		}];
		return callback(null, result);	
	},

	delete: function(id, callback) {
		return callback(null, 1);
	},

	deleteAll: function(username, callback) {
		return callback(null, 1); 
	}
};

module.exports = Target;