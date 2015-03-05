'use strict';

var should = require('chai').should();

var  mockery = require( 'mockery');
var userMock = '../../../test/mock/user.js';
var productMock = '../../../test/mock/product.js';
var userService = '../../../lib/vm-api/services/User';

describe('#addUser()', function() {
    
    var mysql = {
      getQuantity: function (memo, calllback) {
        var result = [
          {
            quantity: 5
          }
        ]
        calllback(null, result);
      }
    }

  before(function () {
    mockery.enable({ useCleanCache: true });
    mockery.registerAllowable(userService);
    mockery.registerSubstitute('../models/User', userMock);
    mockery.registerMock('../../data/db_mysql/base_plan', mysql);
    mockery.registerSubstitute('../models/Product', productMock);
    mockery.warnOnUnregistered(false);
  });

  after(function () {
    mockery.disable();
  });

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