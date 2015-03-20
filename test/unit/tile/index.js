'use strict';

var mockery = require('mockery');

describe('Tile service', function() {

	var cache = {

		createStorage: function(dirPath, callback) {
			var result = 'success';
			return callback(null, result);
		},

		cacheFile: function(dirPath, fileName, uri, callback) {
			var result = 'downloaded';
			return callback(null, result);
		}
	};
	
	before(function() {

		var tileMock = '../../../test/mock/tile';
		var tileService = '../../../lib/vm-api/services/Tile';

		mockery.enable({useCleanCache: true});
		mockery.registerAllowable(tileService);
		mockery.registerMock('../../common/utils', cache);
		mockery.registerSubstitute('../models/Tile', tileMock);
		mockery.warnOnUnregistered(false);
	});

	after(function() {
		mockery.disable();
	});

	require('./getTile');
});