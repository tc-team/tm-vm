'use strict';

var should = require('chai').should();

var User = require('../../../lib/vm-api/services/User');

describe('UserService#addUser()', function() {
  
  it('should add new user', function(done) {
    User.addUser('TestUser', '1234', 'my@mail.com', function (error, result) {
  	  should.not.exist(error);
			result.affectedRows.should.equal(1);
			done();
    });
  });

  it('should add new user', function(done) {
    User.addUser('TestUser', '1234', 'my@mail.com', function (error, result) {
  	  should.not.exist(error);
			result.affectedRows.should.equal(1);
			done();
    });
  });
});