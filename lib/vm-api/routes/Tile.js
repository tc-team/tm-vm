'use strict';

var config = require('../../../config/config').cache;
var tileService = require('../services/Tile');

var TileRouter = {
	readTileImg: function(req, res) { 
		var options = {
		    root:  process.cwd() + '/map/'+ req.params.zoom,
		    dotfiles: 'deny',
		    headers: {
		        'x-timestamp': Date.now(),
		        'x-sent': true
		    }
		  };

		  var fileName = req.params.imgName;
		  res.set({'Cache-Control': 'private',
		  			'Expires': 'Thu, 31 Dec 2037 23:55:55 GMT'
		  		});
		  res.sendFile(fileName, options, function (err) {
		    if (err) {
		      res.status(err.status).end();
		    }
		  });
	},

	readTile: function(req, res) {
		if (req.params.zoom >= 0 && req.params.zoom < 23) {
			if (req.params.type == 'r') {
				var tileStatus = 'road';
				var dirPath = process.cwd() + '/map/' + tileStatus + '/' + req.params.zoom + '/';
				var tileName = req.params.zoom + '-' + req.params.x + '-' + req.params.y + '.png';
				var uri = 'https://www.google.com/maps/vt/pb=!1m4!1m3!1i' + req.params.zoom + '!2i' + req.params.x + '!3i' + req.params.y + '!2m3!!!';
			} else if (req.params.type == 's') {
				var tileStatus = 'satellite';
				var dirPath = process.cwd() + '/map/' + tileStatus + '/' + req.params.zoom + '/';
				var tileName = req.params.zoom + '-' + req.params.x + '-' + req.params.y + '.jpg';
				var uri = 'http://mt.google.com/vt/lyrs=y&x=' + req.params.x + '&y=' + req.params.y + '&z=' + req.params.zoom;
			} else {
				res.status(200).send('Choose tile type r or s');
				return;
			}
			tileService.getTile(req.cookies.username, tileStatus, dirPath, tileName, uri, function(error, result) {
				if (error) {
					res.status(500).send(error);
				} else {
					var tile = {
						name: tileName,
						dir: '/map/' + tileStatus + '/' + req.params.zoom + '/'
					};
					res.status(200).send(tile);
				}
			});
		} else {
			res.status(200).send('Choose zoom between 0 and 22');
		}
	},

	readTiles: function(req, res) {
		if (req.params.zoom >= 0 && req.params.zoom < 23) {
			if (req.params.type == 'r') {
				var tileArray = [];

				var nWidth = Math.ceil(req.params.width / 256) + 2;
				var nHeight = Math.ceil(req.params.height / 256) + 2;

				// var diffX = Math.floor(nWidth / 2);
				// var diffY = Math.floor(nHeight / 2);
				
				var tileStatus = 'road';

				for (var i = 0; i <= nHeight; i++) {
					// var y = Math.abs((Math.pow(2, req.params.zoom) + (req.params.y - diffY)) + i) % Math.pow(2, req.params.zoom);
					var y = (parseInt(req.params.y) + parseInt(i)) % Math.pow(2, req.params.zoom);
					for(var j = 0; j <= nWidth; j++) {
						var tile = {};
						// var x = Math.abs((Math.pow(2, req.params.zoom) + (req.params.x - diffX)) + j) % Math.pow(2, req.params.zoom);	
						var x = (parseInt(req.params.x) + parseInt(j)) % Math.pow(2, req.params.zoom);
						var dirPath = process.cwd() + '/map/' + tileStatus + '/' + req.params.zoom + '/';
						var tileName = req.params.zoom + '-' + x + '-' + y + '.png';
						var uri = 'https://www.google.com/maps/vt/pb=!1m4!1m3!1i' + req.params.zoom + '!2i' + x + '!3i' + y + '!2m3!!!';
						tile = {
							name: tileName,
							dir: '/map/' + tileStatus + '/' + req.params.zoom + '/'
						};
						tileArray.push(tile);
						tileService.getTile(req.cookies.username, tileStatus, dirPath, tileName, uri, function(error, result) {
							if (error) {
								res.status(500).send(error);
							}	 
						});
					}
				}
			} else if (req.params.type == 's') {
				var tileArray = [];

				var nWidth = Math.ceil(req.params.width / 256) + 2;
				var nHeight = Math.ceil(req.params.height / 256) + 2;

					// var diffX = Math.floor(nWidth / 2);
					// var diffY = Math.floor(nHeight / 2);
				
				var tileStatus = 'satellite';

				for (var i = 0; i <= nHeight; i++) {
					// var y = Math.abs((Math.pow(2, req.params.zoom) + (req.params.y - diffY)) + i) % Math.pow(2, req.params.zoom);
					var y = (parseInt(req.params.y) + parseInt(i)) % Math.pow(2, req.params.zoom);
					for(var j = 0; j <= nWidth; j++) {
						var tile = {};
						// var x = Math.abs((Math.pow(2, req.params.zoom) + (req.params.x - diffX)) + j) % Math.pow(2, req.params.zoom);	
						var x = (parseInt(req.params.x) + parseInt(j)) % Math.pow(2, req.params.zoom);
						var dirPath = process.cwd() + '/map/' + tileStatus + '/' + req.params.zoom + '/';
						var tileName = req.params.zoom + '-' + x + '-' + y + '.jpg';
						var uri = 'http://mt.google.com/vt/lyrs=y&x=' + x + '&y=' + y + '&z=' + req.params.zoom;
						tile = {
							name: tileName,
							dir: '/map/' + tileStatus + '/' + req.params.zoom + '/'
						};
						tileArray.push(tile);
						tileService.getTile(req.cookies.username, tileStatus, dirPath, tileName, uri, function(error, result) {
							if (error) {
								res.status(500).send(error);
							}
						});
					}
				}
			} else {
				res.status(200).send('Choose tile type r or s');
				return;
			}
			res.status(200).send(tileArray);
		} else {
			res.status(200).send('Choose zoom between 0 and 22');
		}
	}
};

module.exports = TileRouter;