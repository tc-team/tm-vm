'use strict';

var targetService = require('../services/.js');

var Target = {

	createTarget: function(req, res) {
		targetService.addTarget(req.body.title, req,body.longtitude, req.body.latitude,
			req.body.description, res.body.status, req.cookies.username, function(error, result) {
				if (error) {
					res.status(500).send(error);
				} else {
					res.status(200).send(result);
				}
			});
	},

	readTarget: function(req, res) {
		targetService.getTarget(req.body.longttitude, req.body.latitude, req.cookies.username,
			function(error, result) {
				if (error) {
					res.status(500).send(error);
				} else {
					res.status(200).send(result);	
				}
			});
	},

	updateTarget: function(req, res) {
		targetService.getTarget(req.body.longtitude, req.body.latitude, req.cookies.username, 
			function(error, rows) {
				if (error) {
					res.status(500).send(error);
				} else {
					if (req.body.newTitle) {
						targetService.setTarget(req.body.newTitle, rows[0].description,
							rows[0].status, req.body.longtitude, req.body.latitude, 
							req.cookies.username, function(error, result) {
								if (error) {
									res.status(500).send(error);
								} else {
									res.status(201).send("You updated target title");
								}
							});
					}
					if (req.body.newDescription) {
						targetService.setTarget(rows[0].title, req.body.newDescription, 
							rows[0].status, req.body.longtitude, req.body.latitude,
							req.cookies.username, function(error, result) {
								if (error) {
									res.status(500).send(error);
								} else {
									res.sratus(201).send("You updated target description");
								}
							});
					}
					if (req.body.newStatus) {
						targetService.setTarget(rows[0].title, rows[0].description,
							req.body.newStatus, req.body.longtitude, req.body.latitude,
							req.cookies.username, function(error, result) {
								if (error) {
									res.status(500).send(error);
								} else {
									res.status(201).send("You updated target status");
								}
							});
					} else {
						res.status(200).send("Target data is not changed");
					}
				}
			});
	},

	deleteTarget: function(req, res) {
		targetService.deleteTarget(req.params.id, req.cookies.username, function(error ,result) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200).send("Target successfully deleted");
			}
		});
	}
}

module.exports = Target;