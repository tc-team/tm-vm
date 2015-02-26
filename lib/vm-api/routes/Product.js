'use strict';

var productService = require('../services/Product');

var ProductRouter = {
	createPayment: function (req, res) {
		productService.createPayment(req.body.name, req.body.number, function (error, payment) {
			if (error) {
				res.status(500).send(error);
			} else {
				req.session.paymentId = payment.id;
				var redirectUrl;
		    for(var i=0; i < payment.links.length; i++) {
		      var link = payment.links[i];
		      if (link.method === 'REDIRECT') {
		        redirectUrl = link.href;
		      }
		    }
		    console.log(redirectUrl);
		    res.redirect(redirectUrl);
			}
		});
	},
	executePayment: function (req, res) {
		productService.executePayment(req.session.paymentId, req.param('PayerID'), req.session.username, function (error, payment) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200).json(payment);
			}
		});
	},
	cancelPayment: function (req, res) {
		res.status(200).send("The payment got canceled");
	}
}

module.exports = ProductRouter;