'use strict';

var tokenService = require('../services/Token');
var Promise = require('bluebird');

var TokenRouter = {
	createToken: function (req, res) {
		tokenService.createToken(req.cookies.username, req.body.email).then(function (result) {
			if (result) {
				res.status(201).send('token was created');
			} else {
				res.status(201).send('token was not created');
			}
		});
	},
	readToken: function (req, res) {
		tokenService.checkToken(req.cookies.username, req.params.value).then(function (result) {
			if (typeof result === 'undefined') {
				res.status(500).send('error');
			} else {
				res.status(200).send(result);
			}
		});
	}
}

module.exports = TokenRouter;