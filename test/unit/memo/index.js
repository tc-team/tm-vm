'use strict';

var  mockery = require( 'mockery');

describe('Memo service', function() {
	
	var fake_fs = {
      unlink: function (path, calllback) {
        return calllback(null, 'succes');
      }
    }

	before(function () {
		var memoMock = '../../../test/mock/memo.js';
		var productMock = '../../../test/mock/product.js';
		var memoService = '../../../lib/vm-api/services/Memo';

		mockery.enable({ useCleanCache: true });
		mockery.registerAllowable(memoService);
		mockery.registerSubstitute('../models/Memo', memoMock);

		mockery.registerMock('fs', fake_fs);

		mockery.registerSubstitute('../models/Product', productMock);
		mockery.warnOnUnregistered(false);
	});

	after(function () {
    	mockery.disable();
  	});

	require('./addMemo');
	require('./getMemos');
	require('./deleteMemo');

});