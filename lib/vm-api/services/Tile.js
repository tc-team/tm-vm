'use strict';

var config = require('../../../config/').cache;
var cache = require('../../common/utils.js');
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
		
	getTile: function(sid, tileStatus, zoom, tileX, tileY, callback) {
		var tileName = zoom + '-' + tileX + '-' + tileY + config.fileType;
		var dirPath = config.dirPath + zoom + '/';
		var uri = 'https://www.google.com/maps/vt/pb=!1m4!1m3!1i' + zoom + '!2i' + tileX + '!3i' + tileY + '!2m3!!!'; 
		tileModel.get(sid, tileName, function(error, result) {
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
							cache.cacheFile(dirPath, tileName, uri, function(error) {
								if (error) {
									callback(error);
								} else {
									tileModel.add(sid, tileName, tileStatus, function(error, result) {
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
	},

	getTiles: function(sid, tileStatus, zoom, tileX, tileY, width, height, callback) {
		if (zoom == 0) {
			this.getTile(sid, tileStatus, zoom, tileX, tileY, callback);
		} else if (zoom == 1) {
			for (var i = 0; i < 2; i++) {
				for (var j = 0; j < 2; j++) {
					this.getTile(sid, tileStatus, zoom, j, i, callback);
				}
			}
		} else if (zoom == 2) {
			for (var i = 0; i < 5; i++) {
				for (var j = 0; j < 5; j++) {
					this.getTile(sid, tileStatus, zoom, j, i, callback);
				}
			}
		} else if (zoom == 3) {
			for (var i = 0; i < 9; i++) {
				for (var j= 0; j < 9; j++) {
					this.getTile(sid, tileStatus, zoom, j, i, callback);
				}
			}
		} else if (zoom > 3) {
			var nWidth = Math.round(width / 256);
			var nHeight = Math.round(height / 256);

			var diffX = Math.floor(nWidth / 2);
			var diffY = Math.floor(nHeight / 2);

			for (var i = 0; i <= nHeight; i++) {
				var y = Math.abs((Math.pow(2, 2 * zoom) + (tileY - diffY)) + i) % Math.pow(2, 2 * zoom);
				for (var j = 0; j <= nWidth; j++) {
					var x = Math.abs((Math.pow(2, 2 * zoom) + (tileX - diffX)) + j) % Math.pow(2, 2 * zoom);
					this.getTile(sid, tileStatus, zoom, x, y, callback);
				}
			}
		}	
	}
};

module.exports = Tile;