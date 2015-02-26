'use strict';

var tokenService = require('../services/Token');
var Promise = require('bluebird');

var TokenRouter = {
	createToken: function (req, res) {
		tokenService.createToken(req.cookies.username, req.session.email).then(function (result) {
			if (result) {
				res.status(201).send('token was created');
			} else {
				res.status(201).send('token was not created');
			}
		});
	},
	readToken: function (req, res) {
		tokenService.checkToken(req.session.username, req.params.value).then(function (result) {
			if (typeof result === 'undefined') {
				res.status(500).send('error');
			} else {
				if (result) {
					res.status(200).send('Token found'); // redirect to newPassword form
				} else {
					res.status(404).send('Token not found');
				}
			}
		});
	}
}

module.exports = TokenRouter;