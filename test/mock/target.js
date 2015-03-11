'use strict';

var Target = {

	add: function(title, longitude, latitude, description, status, username, callback) {
		var result = 1;
		return callback(null, result);
	},

	setTitle: function(newTitle, id, callback) {
		return callback(null, 1);
	},

	setDescription: function(newDescription, id, callback) {
		return callback(null, 1);
	},

	setStatus: function(newStatus, id, callback) {
		return callback(null, 1);
	},

	setCoordinates: function(newLongitude, newLatitude, id, callback) {
		return callback(null, 1);
	},

	get: function(longitude, latitude, username, callback) {
		var result = [{
			title: 'title',
			longitude: longitude,
			latitude: latitude,
			description: 'description',
			staus: 'false',
			username: username
		}];
		return callback(null, result);
	}, 

	getAll: function(username, callback) {
		var result = [{
			title: 'title',
			longitude: 30.12,
			latitude: 40.21,
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