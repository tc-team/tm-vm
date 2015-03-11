'use strict';

var mockery = require('mockery');

describe('Target service', function() {

	before(function() {
		var targetMock = '../../../test/mock/target';
		var targetService = '../../../lib/vm-api/services/Target';

		mockery.enable({useCleanCache: true});
		mockery.registerAllowable(targetService);
		mockery.registerSubstitute('../models/Target', targetMock);
		mockery.warnOnUnregistered(false);
	});

	after(function() {
		mockery.disable();
	});

	require('./addTarget');
	require('./setTarget');
	require('./getTargets');
	require('./deleteTarget');
});