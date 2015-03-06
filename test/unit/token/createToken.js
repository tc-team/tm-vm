'use strict';

var should = require('chai').should();

var tokenService = '../../../lib/vm-api/services/Token';

describe('#createToken()', function() {
  it('should create token', function() {
  	var Token = require(tokenService);
    return Token.createToken('TestUser', 'test.tkachuk@gmail.com').should.be.fulfilled;
  });
});