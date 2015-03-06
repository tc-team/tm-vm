'use strict';

var  mockery = require( 'mockery');


describe('User service', function () {

	var mysql = {
      getQuantity: function (memo, calllback) {
        var result = [
          {
            quantity: 5
          }
        ]
        calllback(null, result);
      }
    }

	before(function () {
		var userMock = '../../../test/mock/user.js';
		var productMock = '../../../test/mock/product.js';
		var userService = '../../../lib/vm-api/services/User';

		mockery.enable({ useCleanCache: true });
		mockery.registerAllowable(userService);
		mockery.registerSubstitute('../models/User', userMock);
		mockery.registerMock('../../data/db_mysql/base_plan', mysql);
		mockery.registerSubstitute('../models/Product', productMock);
		mockery.warnOnUnregistered(false);
	});

	after(function () {
    	mockery.disable();
  	});

	require('./addUser');
	require('./getUser');
	require('./setUser');

});