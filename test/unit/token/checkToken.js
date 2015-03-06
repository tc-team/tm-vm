'use strict';

var should = require('chai').should();

var tokenSevice = '../../../lib/vm-api/services/Token';

describe('#checkToken()', function() {
	it('should find token', function() {
		var Token = require(tokenSevice);
    	return Token.checkToken('Pasha', '59204cb74856bb61ac2b2cb050e7c2cc').should.be.fulfilled;
  });

});