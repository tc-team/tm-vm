'use strict';

var should = require('chai').should();
var md5 = require('MD5');

var mockery = require( 'mockery');
var userMock = '../../../test/mock/user.js';
var userService = '../../../lib/vm-api/services/User';

describe('#setUser()', function() {
  
  before(function () {
    mockery.enable({ useCleanCache: true });
    mockery.registerAllowable(userService);
    mockery.registerSubstitute('../models/User', userMock);
    mockery.warnOnUnregistered(false);
  });

  after(function () {
    mockery.disable();
  });


  it('should update user profile', function(done) {
    var User = require(userService);

    User.setUserPass('TestUser', md5('12345'), function (error, result) {
  	  should.not.exist(error); 
			result.should.equal(1);
			done();
    });
  });

  it('should update user profile', function(done) {
    var User = require(userService);
    User.setUserEmail('TestUser', 'my2@mail.com', function (error, result) {
      should.not.exist(error);
      should.exist(result);
      result.should.equal(1);
      done();
    });
  });

});