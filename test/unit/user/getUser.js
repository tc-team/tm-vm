'use strict';

var should = require('chai').should();

var User = require('../../../lib/vm-api/services/User');

describe('UserService#getUser()', function() {
  it('should get user info', function(done) {
    User.getUser('TestUser', function (error, result) {
  	  should.not.exist(error);
			result.username.should.equal('TestUser');
      result.password.should.not.equal('1234');
			done();
    });
  });
});