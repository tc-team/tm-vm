'use strict';

var should = require('chai').should();

var mockery = require( 'mockery');
var userMock = '../../../test/mock/user.js';
var userService = '../../../lib/vm-api/services/User';

describe('#getUser()', function() {
	
	before(function () {
    	mockery.enable({ useCleanCache: true });
		mockery.registerAllowable(userService);
    	mockery.registerSubstitute('../models/User', userMock);
    	mockery.warnOnUnregistered(false);
  	});

  	after(function () {
	    mockery.disable();
  	});

	it('should get user info', function(done) {
    	
    	var User = require(userService);

	    User.getUser('TestUser', function (error, result) {
	  	  	should.not.exist(error);
			result.username.should.equal('TestUser');
	      	result.password.should.not.equal('1234');
			done();
	    });
	});
});