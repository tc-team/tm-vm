'use strict';

var should = require('chai').should();
var targetService = '../../../lib/vm-api/services/Target';

describe('#deleteTarget', function() {

	it('should delete target', function(done) {
		var Target = require(targetService);

		Target.deleteTarget(123, function(error, result) {
			should.not.exist(error);
			should.exist(result);
			result.should.equal(1);
			done();
		});
	});
});