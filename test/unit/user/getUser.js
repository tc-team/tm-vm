'use strict';

var should = require('chai').should();
var userService = '../../../lib/vm-api/services/User';

describe('#getUser()', function() {

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