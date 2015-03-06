'use strict';

var should = require('chai').should();

var userService = '../../../lib/vm-api/services/User';

describe('#addUser()', function() {
    
  it('should add new user', function(done) {
    var User = require(userService);

    User.addUser('TestUser', '1234', 'my@mail.com', function (error, result) {
  	  should.not.exist(error);
			result.affectedRows.should.equal(1);
			done();
    });
  });

  it('should add new user', function(done) {
    var User = require(userService);
    
    User.addUser('TestUser', '1234', 'my@mail.com', function (error, result) {
  	  should.not.exist(error);
			result.affectedRows.should.equal(1);
			done();
    });
  });
});