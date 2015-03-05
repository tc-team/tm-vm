'use strict';

var should = require('chai').should();

var Memo = require('../../../lib/vm-api/services/Memo');

describe('#getMemos()', function() {
  it('should get all memos', function(done) {
    Memo.getMemos('TestUser', function (error, result) {
  	  should.not.exist(error);
		  should.exist(result);
      result.length.should.equal(1);
			done();
    });
  });
});