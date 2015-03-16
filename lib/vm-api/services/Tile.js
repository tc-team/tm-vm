'use strict';

var config = require('../../../config/').cache;
var cache = require('../../common/utils.js');
var tileModel = require('../models/Tile');

var Tile = {
	longToTileX: function(long, zoom) {
		var tileX = Math.floor(((longtitude + 180) / 360) * Math.pow(2, zoom));
		return tileX; 
	},

	latToTileY: function(lat, zoom) {
		var tileY = Math.floor((1 - (Math.log(Math.tan(latitude * Math.PI / 180) +
			1 / Math.cos(latitude * Math.PI / 180)) / Math.PI)) / 2 * 
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
		var nWidth = Math.round(width / config.width);
		var nHeight =Math.round(height / config.height);

		var diffX = Math.floor(nWidth / 2);
		var diffY = Math.floor(nHeight / 2);

		for (var i = 0; i <= nHeight; i++) {
			var y = Math.abs((Math.pow(2, zoom) + (tileY - diffY)) + i) % Math.pow(2, zoom);
			for (var j = 0; j <= nWidth; j++) {
				var x = Math.abs((Math.pow(2, zoom) + (tileX - diffX)) + j) % Math.pow(2, zoom);
				this.getTile(sid, tileStatus, zoom, x, y, callback);
			}
		}
	}
};

module.exports = Tile;