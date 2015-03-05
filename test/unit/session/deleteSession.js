'use strict';

var should = require('chai').should();

var Session = require('../../../lib/vm-api/services/Session');

describe('#deleteSession()', function() {
  it('should delete session', function(done) {
    Session.deleteSession('TestUser', function (error, result) {
  	  should.not.exist(error);
		  should.exist(result);
			result.should.equal(1);
			done();
    });
  });

});