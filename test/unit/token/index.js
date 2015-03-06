
var  mockery = require( 'mockery');

describe('Token service', function() {
	var nodemailer = {
      createTransport: function (config) {
      	var Transporter = {
      		sendMail: function (mailOption, callback) {
      			return callback(null, 'send');
      		}
      	}
      	var fake_transporter = Transporter;
      	return fake_transporter;
      }
    }

	before(function () {
		var tokenMock = '../../../test/mock/token.js';
		var tokenService = '../../../lib/vm-api/services/Token';
	
		mockery.enable({ useCleanCache: true });
		mockery.registerAllowable(tokenService);
		mockery.registerSubstitute('../models/Token', tokenMock);
		mockery.registerMock('nodemailer', nodemailer);
		mockery.warnOnUnregistered(false);
	});

	after(function () {
    	mockery.disable();
  	});

	require('./checkToken.js');
	require('./createToken.js');

});