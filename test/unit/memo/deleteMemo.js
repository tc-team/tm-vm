'use strict';

var should = require('chai').should();

var Memo = require('../../../lib/vm-api/services/Memo');

describe('MemoService#deleteMemo()', function() {
  it('should delete memo', function(done) {
    Memo.deleteMemo(23, 'TestUser', function (error, result) {
  	  should.not.exist(error);
		  should.exist(result);
      result.affectedRows.should.equal(1);
			done();
    });
  });
});