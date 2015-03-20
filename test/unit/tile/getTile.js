'use strict';

var should = require('chai').should();

var tileService = '../../../lib/vm-api/services/Tile';

describe('#getTile()', function() {

	it('should get a tile', function(done) {

		var Tile = require(tileService);

		Tile.getTile('testName', 1, 'map/test/', '1-1-1.png', 'https://www.google.com', function(error, result) {
			should.not.exist(error);
			should.exist(result);
			result.should.equal(1);
			done();
		});
	});
});