'use strict';

var should = require('chai').should();

var Token = require('../../../lib/vm-api/services/Token');

describe('#checkToken()', function() {
	it('should find token', function() {
    return Token.checkToken('Pasha', '59204cb74856bb61ac2b2cb050e7c2cc').should.be.fulfilled;
  });

});