'use strict';

var redis = require('../../data/db_redis/tile');

var Tile = {
	add: function(username, tileName, tileStatus, callback) {
		redis.setTileStatus(username, tileName, tileStatus, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	get: function(username, tileName, callback) {
		redis.getTileStatus(username, tileName, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	delete: function(username, callback) {
		redis.deleteTileStatus(username, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	}
};

module.exports = Tile;