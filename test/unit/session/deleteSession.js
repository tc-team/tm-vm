'use strict';

var should = require('chai').should();

var sessionService = '../../../lib/vm-api/services/Session';
describe('#deleteSession()', function() {
  it('should delete session', function(done) {
	var Session = require(sessionService);
    Session.deleteSession('TestUser', function (error, result) {
  	  should.not.exist(error);
		  should.exist(result);
			result.should.equal(1);
			done();
    });
  });

});