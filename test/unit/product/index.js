'use strict';

var  mockery = require( 'mockery');

describe('Product service', function() {
	
	before(function () {
		var productMock = '../../../test/mock/product.js';
		var productService = '../../../lib/vm-api/services/Product.js';
	
		mockery.enable({ useCleanCache: true });
		mockery.registerAllowable(productService);
		mockery.registerSubstitute('../models/Product', productMock);
		
		mockery.warnOnUnregistered(false);
	});

	after(function () {
    	mockery.disable();
  	});
  	require('./getProduct');
 
});