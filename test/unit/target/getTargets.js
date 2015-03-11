'use strict';

var should = require('chai').should();
var targetService = '../../../lib/vm-api/services/Target';
describe('#getAllTargets()', function() {

	it('should get all targets', function(done) {
		var Target = require(targetService);

		Target.getAllTargets('usertest', function(error, result) {
			should.not.exist(error);
			should.exist(result);
			result.length.should.equal(1);
			done();
		});
	});
});