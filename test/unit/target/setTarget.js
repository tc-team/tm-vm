'use strict';

var should = require('chai').should();
var targetService = '../../../lib/vm-api/services/Target';

describe('#setTarget()', function() {

	it('should update target', function(done){
		var Target = require(targetService);

		Target.setTargetTitle('newTitle', 22, function(error, result) {
			should.not.exist(error);
			result.should.equal(1);
			done();
		});
	});

	it('should update target', function(done){
		var Target = require(targetService);

		Target.setTargetCoordinates(40.12,  50.22, 22, function(error, result) {
			should.not.exist(error);
			result.should.equal(1);
			done();
		});
	});

	it('should update target', function(done){
		var Target = require(targetService);

		Target.setTargetDescription('newDescription', 22, function(error, result) {
			should.not.exist(error);
			result.should.equal(1);
			done();
		});
	});

	it('should update target', function(done){
		var Target = require(targetService);

		Target.setTargetStatus(false, 22, function(error, result) {
			should.not.exist(error);
			result.should.equal(1);
			done();
		});
	});

});