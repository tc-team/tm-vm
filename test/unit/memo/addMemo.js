'use strict';

var should = require('chai').should();

var memoService = '../../../lib/vm-api/services/Memo';

describe('#addMemo()', function() {
  it('should add new memo', function(done) {
  	var Memo = require(memoService);

    Memo.addMemo('11233', 'myMemo', 'http://localhost:3000/memos/my.wav', 'TestUser', function (error, result) {
  	 	should.not.exist(error);
		should.exist(result);
      	result.should.equal('success');
		done();
    });
  });
});