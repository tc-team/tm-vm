'use strict';

var redis = require('../../data/db_redis/tile');

var Tile = {
	add: function(sid, tileName, tileStatus, callback) {
		redis.setTileStatus(sid, tileName, tileName, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	get: function(sid, tileName, callback) {
		redis.getTileStatus(sid, tileName, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	},

	delete: function(sid, callback) {
		redis.deleteTileStatus(sid, function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
		});
	}
};

module.exports = Tile;