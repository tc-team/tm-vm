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
	
					cache.getFile(dirPath, tileName, function(error, result) {
						if (error) {

							callback(error, null);
						} else {

							callback(error, result);
						}
					});		
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
							
											cache.getFile(dirPath, tileName, function(error, result) {
												if (error) {

													callback(error, null);
												} else {

													callback(error, result);
												}
											});
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

	getTilesArrayJson: function(zoom, x, y, width, height, tileStatus, imgType) {
		if (zoom == 1) {
			var tileArray = [];
			for (var i = 0; i < 1; i++) {
				for (var j = 0; j < 1; j++) {
					var tile = {
						name: zoom + '-' + j + '-' + i + '.' + imgType,
						dir: '/map/' + tileStatus + '/' + zoom + '/'
					};
					tileArray.push(tile);
				}
			}

		} else if (zoom == 2) {
			var tileArray = [];
			for (var i = 0; i < 2; i++) {
				for (var j = 0; j < 2; j++) {
					var tile = {
						name:  zoom + '-' + j + '-' + i + '.' + imgType,
						dir: '/map/' + tileStatus + '/' + zoom + '/' 
					};
					tileArray.push(tile);
				}
			}
		} else if (zoom == 3) {
			var tileArray = [];
			for (var i = 0; i < 4; i++) {
				for (var j = 0; j < 4; j++) {
					var tile = {
						name: zoom + '-' + j + '-' + i + '.' + imgType,
						dir: '/map/' + tileStatus + '/' + zoom + '/' 
					};
					tileArray.push(tile);
				}
			}
		} else if (zoom > 3 && zoom < 23) {

			var nWidth = Math.ceil(width / 256) + 2;
			var nHeight = Math.ceil(height / 256) + 2;

			var tileArray = [];
			for (var i = 0; i < nHeight; i++) {
				y = (y + i) % Math.pow(2, zoom);
				for (var j = 0; j < nWidth; j++) {
					 x = (x + j) % Math.pow(2, zoom); 
					var tile = {
						name: zoom + '-' + x + '-' + y + '.' + imgType,
						dir: '/map/' + tileStatus + '/' + zoom + '/'
					};
					tileArray.push(tile);
				}
			}
		} else {
			return;
		}
		return tileArray;
	}
};
	
module.exports = Tile