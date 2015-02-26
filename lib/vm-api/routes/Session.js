'use strict';

var sessionService = require('../services/Session');

var SessionRouter = {
	createSession: function (req, res) {
		sessionService.addSession(req.body.username, req.body.password, req.sessionID, function (error, result) {
			if (error) {
				res.status(500).send(error);
			} else {					
				if (result) {
					res.cookie('username', result[0].username, {httpOnly: false, signed: false});
					var response = {
						status: 'success',
						text: 'You have successfully logged'
					}
					res.status(200).send(response);
				} else {
					var response = {
						status: 'error',
						text: 'Error entered data'
					}
					res.status(200).send(response);
				}
			}
		});
	},
	deleteSession: function (req, res) {
		sessionService.deleteSession(req.cookies.username, function (error, result) {
			if (error) {
				res.status(500).send(error);
			} else {
					res.clearCookie('username');
					res.clearCookie('sid');
					req.session.destroy();
					var response = {
						status: 'success',
						text: 'You successfully log out'
					}
					res.status(200).send(response);
			}
		});
	},
 	checkSession: function (req, res) {
 		sessionService.checkSession(req.cookies.username, req.sessionID, function (error, result) {
			if (error) {
				res.status(500).send(error);
			} else {
					res.status(200).send(result);
			}
		});
 	}
}

module.exports = SessionRouter;