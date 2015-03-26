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
			if (error) {

				callback(error, null);
			} else {

				if (tileStatus == result) {
	
					callback(null, true);		
				} else {	
			
					cache.createStorage(dirPath, function(error, result) {
						if (error) {
			
							callback(error, null);
						} else {
			
							cache.cacheFile(dirPath, tileName, uri, function(error, result) {
								if (error) {
					
									callback(error, null);
								} else {
					
									tileModel.add(username, tileName, tileStatus, function(error, result) {
										if (error) {
							
											callback(error, null);
										} else {
							
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