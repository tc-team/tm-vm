'use strict';

var should = require('chai').should();

var Token = require('../../../lib/vm-api/services/Token');

describe('TokenService#createToken()', function() {
  it('should create token', function() {
    return Token.createToken('TestUser', 'test.tkachuk@gmail.com').should.be.fulfilled;
  });
});