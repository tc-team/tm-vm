'use strict';

var config = require('../../../config/config').cache;
var tileService = require('../services/Tile');

var TileRouter = {

	readTileByXY: function(req, res) {
		if (req.params.zoom >= 0 && req.params.zoom < 23) {

			if (req.params.type == 'r') {
				var tileStatus = 'road';
				var imgType = 'png';
				var dirPath = process.cwd() + '/map/' + tileStatus + '/' + req.params.zoom + '/';
				var tileName = req.params.zoom + '-' + req.params.x + '-' + req.params.y + '.' + imgType;
				var uri = 'https://www.google.com/maps/vt/pb=!1m4!1m3!1i' + req.params.zoom + '!2i' + req.params.x + '!3i' + req.params.y + '!2m3!!!';
			
			} else if (req.params.type == 's') {
				var tileStatus = 'satellite';
				var imgType = 'jpg';
				var dirPath = process.cwd() + '/map/' + tileStatus + '/' + req.params.zoom + '/';
				var tileName = req.params.zoom + '-' + req.params.x + '-' + req.params.y + '.' + imgType;
				var uri = 'http://mt.google.com/vt/lyrs=y&x=' + req.params.x + '&y=' + req.params.y + '&z=' + req.params.zoom;
			
			} else {
				res.status(200).send('Choose tile type r or s');
				return;
			
			}
			tileService.getTile(req.cookies.username, tileStatus, dirPath, tileName, uri, function(error, result) {
				if (error) {
					res.status(500).send(error);
				} else {
					res.status(200).send(result);
				}
			});
		
		} else {
			res.status(200).send('Choose zoom between 0 and 22');
		}
	},

	readTileByLongLat: function(req, res) {
		if (req.params.zoom >= 0 && req.params.zoom < 23) {

			if (req.params.type == 'r') {
				var x = tileService.longToTileX(parseFloat(req.params.long), parseInt(req.params.zoom));
				var y = tileService.latToTileY(parseFloat(req.params.lat), parseInt(req.params.zoom));
				var tileStatus = 'road';
				var imgType = 'png';
				var dirPath = process.cwd() + '/map/' + tileStatus + '/' + req.params.zoom + '/';
				var tileName = req.params.zoom + '-' + x + '-' + y + '.' + imgType;
				var uri = 'https://www.google.com/maps/vt/pb=!1m4!1m3!1i' + req.params.zoom + '!2i' + x + '!3i' + y + '!2m3!!!';
	
			} else if (req.params.type == 's') {
				var x = tileService.longToTileX(parseFloat(req.params.long), parseInt(req.params.zoom));
				var y = tileService.latToTileY(parseFloat(req.params.lat), parseInt(req.params.zoom));
				var tileStatus = 'satellite';
				var imgType = 'jpg';
				var dirPath = process.cwd() + '/map/' + tileStatus + '/' + req.params.zoom + '/';
				var tileName = req.params.zoom + '-' + x + '-' + y + '.' + imgType;
				var uri = 'http://mt.google.com/vt/lyrs=y&x=' + x + '&y=' + y + '&z=' + req.params.zoom;

			} else {
				res.status(200).send('Choose tile type r or s');
				return;
			}

			tileService.getTile(req.cookies.username, tileStatus, dirPath, tileName, uri, function(error, result) {
				if (error) {
					res.status(500).send(error);
				} else {
					// var arrayJson = tileService.getTilesArrayJson(req.params.zoom, x, y, req.params.width, req.params.height, tileStatus, imgType);
					res.status(200).send(result);
				}
			});

		} else {
			res.status(200).send('Choose zoom between 0 and 22');
		}
	}
};

module.exports = TileRouter;