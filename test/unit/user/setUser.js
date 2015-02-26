'use strict';

var should = require('chai').should();
var md5 = require('MD5');

var User = require('../../../lib/vm-api/services/User');

describe('UserService#setUser()', function() {
  it('should update user profile', function(done) {
    User.setUser('TestUser', md5('12345'), 'my@mail.com', function (error, result) {
  	  should.not.exist(error); 
			result.changedRows.should.equal(1);
			done();
    });
  });

  it('should update user profile', function(done) {
    User.setUser('TestUser', md5('1234'), 'my2@mail.com', function (error, result) {
      should.not.exist(error);
      should.exist(result);
      result.changedRows.should.equal(1);
      done();
    });
  });

});