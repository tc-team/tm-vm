'use strict';

var Cache = {

	createStorage: function(dirPath, callback) {
		var result = 1;
		return callback(null, result);
	},

	removeCache: function(dirPath, callback) {
		var result = 1;
		return callback(null, result);
	},

	cacheFile: function(dirPath, fileName, uri, callback) {
		var result = 1;
		return callback(null, result);
	}
};