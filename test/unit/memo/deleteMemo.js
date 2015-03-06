'use strict';

var should = require('chai').should();

var memoService = '../../../lib/vm-api/services/Memo';

describe('#deleteMemo()', function() {
  it('should delete memo', function(done) {
    
    var Memo = require(memoService);
	
    Memo.deleteMemo(23, 'TestUser', function (error, result) {
	  	should.not.exist(error);
	    should.exist(result);
		  result.affectedRows.should.equal(1);
		  done();
    });
  });
});