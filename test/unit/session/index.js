'use strict';

var  mockery = require( 'mockery');

describe('Session service', function() {

	before(function () {
		var sessionMock = '../../../test/mock/session.js';
		var userMock = '../../../test/mock/user.js';
		var sessionService = '../../../lib/vm-api/services/Session';
	
		mockery.enable({ useCleanCache: true });
		mockery.registerAllowable(sessionService);
		mockery.registerSubstitute('../models/Session', sessionMock);
		mockery.registerSubstitute('../models/User', userMock);
		mockery.warnOnUnregistered(false);
	});

	after(function () {
    	mockery.disable();
  	});

	require('./addSession');
	require('./deleteSession');

});