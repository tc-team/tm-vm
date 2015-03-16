'use strict';

var config = require('../../../config/config').cache;
var tileService = require('../services/Tile.js');

var TileRouter = {

	readTile: function(req, res) {
		var zoom = req.params.zoom;
		var tileX = tileService.longToTileX(req.params.x, zoom)
		var tileY = tileService.latToTileY(req.params.y, zoom);
		var tileStatus = config.status;
		tileService.getTile(req.sessionID, tileStatus, zoom, tileX, tileY, function(error, result) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200).send(result);
			}
		});
	},

	readTiles: function(req, res) {
		var zoom = req.params.zoom;
		var tileX = tileService.longToTileX(req.params.x, zoom);
		var tileY = tileService.latToTileY(req.params.y, zoom);
		var width = req.params.width;
		var height = req.params.height;
		var tileStatus = config.status;
		tileService.getTiles(req.sessionID, tileStatus, zoom, tileX, tileY, width, height, function(error, result) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200).send(result);
			}
		});
	}
};

module.exports = TileRouter;