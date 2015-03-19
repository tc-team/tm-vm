'use strict';

var cache = require('../../common/utils');
var tileModel = require('../models/Tile');

var Tile = {

	longToTileX: function(long, zoom) {
		var tileX = Math.floor(((long + 180) / 360) * Math.pow(2, zoom));
		return tileX; 
	},

	latToTileY: function(lat, zoom) {
		var tileY = Math.floor((1 - (Math.log(Math.tan(lat * Math.PI / 180) +
			1 / Math.cos(lat * Math.PI / 180)) / Math.PI)) / 2 * 
			Math.pow(2, zoom));
		return tileY;
	},
		
	getTile: function(username, tileStatus, dirPath, tileName, uri, callback) {
		tileModel.get(username, tileName, function(error, result) {
			console.log(1);
			if (error) {
				console.log(2);
				callback(error, null);
			} else {
				console.log(3);
				if (tileStatus == result) {
					console.log(4);
					callback(null, true);		
				} else {	
					console.log(5);		
					cache.createStorage(dirPath, function(error, result) {
						if (error) {
							console.log(6);
							callback(error, null);
						} else {
							console.log(7);
							cache.cacheFile(dirPath, tileName, uri, function(error, result) {
								if (error) {
									console.log(8);
									callback(error, null);
								} else {
									console.log(9);
									tileModel.add(username, tileName, tileStatus, function(error, result) {
										if (error) {
											console.log(10);
											callback(error, null);
										} else {
											console.log(11);
											callback(null, result);
										}
									});
								}
							});
						}
					});
				}
			}
		});
	}	
};
	
module.exports = Tile