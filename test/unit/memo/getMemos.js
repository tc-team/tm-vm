'use strict';

var should = require('chai').should();

var memoService = '../../../lib/vm-api/services/Memo';

describe('#getMemos()', function() {
  it('should get all memos', function(done) {
  	var Memo = require(memoService);
    Memo.getMemos('TestUser', function (error, result) {
  	  	should.not.exist(error);
		should.exist(result);
  		result.length.should.equal(1);
		done();
    });
  });
});