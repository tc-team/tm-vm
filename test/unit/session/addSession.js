'use strict';

var should = require('chai').should();

var sessionService = '../../../lib/vm-api/services/Session';

describe('#addSession()', function() {
  it('should add new session', function(done) {
  	var Session = require(sessionService);

    Session.addSession('TestUser', '1234', 'qweq123123.ewfweuasvEWBFYUSDYUA', function (error, result) {
  	  	should.not.exist(error);
		result[0].username.should.equal('TestUser');
		done();
    });
  });

});