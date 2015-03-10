'use strict';

var chai = require('chai').should();

describe('#addTarget()', function() {

	it('should add a new target', function(done) {
		var Target = require(targetService);

		Target.addTarget('target', 50.45, 30.34, 'description', false, 'testuser', function(error, result) {
			should.not.exist(error);
			result.should.equal(1);
			done();
		});
	});

	it('should add a new target', function(done) {
		var Target = require(targetService);

		Target.addTarget('target', 50.45, 30.34, 'description', false, 'testuser', function(error, result) {
			should.not.exist(error);
			result.should.equal(1);
			done();
		});
	});
});