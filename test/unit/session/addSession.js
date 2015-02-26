'use strict';

var should = require('chai').should();

var Session = require('../../../lib/vm-api/services/Session');

describe('SessionService#addSession()', function() {
  it('should add new session', function(done) {
    Session.addSession('TestUser', '1234', 'qweq123123.ewfweuasvEWBFYUSDYUA', function (error, result) {
  	  should.not.exist(error);
			result[0].username.should.equal('TestUser');
			done();
    });
  });

});