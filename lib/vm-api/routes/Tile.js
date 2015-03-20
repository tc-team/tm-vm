'use strict';

var config = require('../../../config/config').cache;
var tileService = require('../services/Tile');

var TileRouter = {

	readTile: function(req, res) {
		if (req.params.zoom >= 0 && req.params.zoom < 23) {
			var zoom = req.params.zoom;
			var tileX = tileService.longToTileX(req.params.x, zoom);
			var tileY = tileService.latToTileY(req.params.y, zoom);
			var tileStatus = config.status;
			var nodeDirectory = process.cwd();
			var dirPath = nodeDirectory + '/map/' + zoom + '/';
			var tileName = zoom + '-' + tileX + '-' + tileY + '.png';
			var uri = 'https://www.google.com/maps/vt/pb=!1m4!1m3!1i' + zoom + '!2i' + tileX + '!3i' + tileY + '!2m3!!!';
			tileService.getTile(req.cookies.username, tileStatus, dirPath, tileName, uri, function(error, result) {
				if (error) {
					res.status(500).send(error);
				} else {
					var tile = {};
					tile[tileName] = '/map/' + zoom + '/';
					res.status(200).send(tile);
				} 
			});
		} else {
			res.status(200).send('Choose zoom between 0 and 23');
		}
	},

	readTiles: function(req, res) {
		if (req.params.zoom == 0) {
			var zoom = req.params.zoom;
			var tileStatus = config.status;
			var tileArray = [];
			var tile = {};
			var nodeDirectory = process.cwd();
			var dirPath = nodeDirectory + '/map/' + zoom + '/';
			var tileName = zoom + '-' + 0 + '-' + 0 + '.png';
			tile[tileName] = '/map/' + zoom + '/';
			tileArray.push(tile);
			var uri = 'https://www.google.com/maps/vt/pb=!1m4!1m3!1i' + zoom + '!2i' + 0 + '!3i' + 0 + '!2m3!!!';
			tileService.getTile(req.cookies.username, tileStatus, dirPath, tileName, uri, function(error, result) {
				if (error) {
					res.status(500).send(error);
				} else {
					res.status(200).send(tileArray);
				}
			});
		} else if (req.params.zoom == 1) {
			var zoom = req.params.zoom;
			var tileStatus = config.status;
			var tileArray = [];
			for (i = 0; i < 2; i++) {
				for (j = 0; j < 2; j++) {
					var tile = {};
					var nodeDirectory = process.cwd();
					var dirPath = nodeDirectory + '/map/' + zoom + '/';
					var tileName = zoom + '-' + j + '-' + i + '.png';
					tile[tileName] = '/map/' + zoom + '/';
					tileArray.push(tile);
					var uri = 'https://www.google.com/maps/vt/pb=!1m4!1m3!1i' + zoom + '!2i' + j + '!3i' + i + '!2m3!!!';
					tileService.getTile(req.cookies.username, tileStatus, dirPath, tileName, uri, function(error, result) {
						if (error) {
							res.status(500).send(error); 
						} 
					});
				}
			}
			res.status(200).send(tileArray);
		} else if (req.params.zoom == 2) {
			var zoom = req.params.zoom;
			var tileStatus = config.status;
			var tileArray = [];
			for (var i = 0; i < 4; i++) {
				for (var j = 0; j < 4; j++) {
					var tile = {}
					var nodeDirectory = process.cwd();
					var dirPath = nodeDirectory + '/map/' + zoom + '/';
					var tileName = zoom + '-' + j + '-' + i + '.png';
					tile[tileName] = '/map/' + zoom + '/';
					tileArray.push(tile);
					var uri = 'https://www.google.com/maps/vt/pb=!1m4!1m3!1i' + zoom + '!2i' + j + '!3i' + i + '!2m3!!!';
					tileService.getTile(req.cookies.username, tileStatus, dirPath, tileName, uri, function(error, result) {
						if (error) {
							res.status(500).send(error);
						}
					});
				}
			}
			res.status(200).send(tileArray);
		} else if (req.params.zoom == 3) {
			var zoom = req.params.zoom;
			var tileStatus = config.status;
			var tileArray = [];
			for (var i = 0; i < 8; i++) {
				for (var j= 0; j < 8; j++) {
					var tile = {}
					var nodeDirectory = process.cwd();
					var dirPath = nodeDirectory + '/map/' + zoom + '/';
					var tileName = zoom + '-' + j + '-' + i + '.png';
					tile[tileName] = '/map/' + zoom + '/';
					tileArray.push(tile)
					var uri = 'https://www.google.com/maps/vt/pb=!1m4!1m3!1i' + zoom + '!2i' + j + '!3i' + i + '!2m3!!!';
					tileService.getTile(req.cookies.username, tileStatus, dirPath, tileName, uri, function(error, result) {
						if (error) {
							res.status(500).send(error);
						}
					});
				}
			}
			res.status(200).send(tileArray);
		} else if (req.params.zoom > 3 && req.params.zoom < 23) {
			var zoom = req.params.zoom;
			var tileX = tileService.longToTileX(req.params.x, zoom);
			var tileY = tileService.latToTileY(req.params.y, zoom);
			var width = req.params.width;
			var height = req.params.height;
			var tileStatus = config.status;

			var tileArray = [];

			var nWidth = Math.round(width / 256);
			var nHeight = Math.round(height / 256);

			var diffX = Math.floor(nWidth / 2);
			var diffY = Math.floor(nHeight / 2);

			for (var i = 0; i <= nHeight; i++) {
				var y = Math.abs((Math.pow(2, zoom) + (tileY - diffY)) + i) % Math.pow(2, zoom);
				for (var j = 0; j <= nWidth; j++) {
					var tile = {};
					var x = Math.abs((Math.pow(2, zoom) + (tileX - diffX)) + j) % Math.pow(2, zoom);
					var nodeDirectory = process.cwd();
					var dirPath = nodeDirectory + '/map/' + zoom + '/';
					var tileName = zoom + '-' + x + '-' + y + '.png';
					tile[tileName] = '/map/' + zoom + '/';
					tileArray.push(tile);
					var uri = 'https://www.google.com/maps/vt/pb=!1m4!1m3!1i' + zoom + '!2i' + x + '!3i' + y + '!2m3!!!';
					tileService.getTile(req.cookies.username, tileStatus, dirPath, tileName, uri, function(error, result){
						if (error) {
							res.status(500).send(error);
						}
					}); 
				}
			}
			res.status(200).send(tileArray);
		} else {
			res.status(200).send('Choose zoom between 0 and 22');
		}
	}
};

module.exports = TileRouter;