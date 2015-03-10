'use strict';

var targetService = require('../services/Target');

var TargetRouter = {

	createTarget: function(req, res) {
		targetService.addTarget(req.body.title, req.body.longitude, req.body.latitude,
			req.body.description, req.body.status, req.cookies.username, function(error, result) {
				if (error) {
					res.status(500).send(error);
				} else {
					res.status(200).send(result);
				}
			});
	},

	readTarget: function(req, res) {
		targetService.getTarget(req.params.longttitude, req.params.latitude, req.cookies.username,
			function(error, result) {
				if (error) {
					res.status(500).send(error);
				} else {
					res.status(200).send(result);	
				}
			});
	},

	readAllTargets: function(req, res) {
		targetService.getAllTargets(req.cookies.username, function(error, result) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200).send(result);
			}
		});
	},

	updateTarget: function(req, res) {
		if (req.body.newTitle) {
			targetService.setTargetTitle(req.body.newTitle, req.params.longitude, req.params.latitude,
				res.cookies.username, function(error, result) {
					if (error) {
						res.status(500).send(error);
					} else {
						res.status(201).send('You changed target title');
					}
				});	
		}
		if (req.body.newDescription) {
			targetService.setTargetDescription(req.body.newDescription, req.params.longitude,
				req.params.latitude, req.cookies.username, function(error, result) {
					if (error) {
						res.status(500).send(error);
					} else {
						res.status(201).send('You changed target description');
					}
				});
		}
		if (req.body.newStatus) {
			targetService.setTargetStatus(req.body.newStatus, req.params.longitude, req.params.latitude,
				req.cookies.username, function(error, result) {
					if (error) {
						res.status(500).send(error);
					} else {
						res.status(201).send('You changed target status');
					}
				});
		} else {
			res.status(200).send('Target data is not changed');
		}
	},

	deleteTarget: function(req, res) {
		targetService.deleteTarget(req.params.id, function(error ,result) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200).send("Target successfully deleted");
			}
		});
	}
}

module.exports = TargetRouter;