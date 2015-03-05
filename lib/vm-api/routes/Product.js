'use strict';

var productService = require('../services/Product');

var ProductRouter = {
	getProduct: function (req, res) {
		productService.getProduct(req.params.name, req.cookies.username, function (error, result) {
	      	if (error) {
	        	res.status(500).send(error);
	      	} else {
	        	res.status(200).send(result);
	      	}
	      	return;
	    });
	},
	createPayment: function (req, res) {
		productService.createPayment(req.body.name, req.body.number, function (error, payment) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.cookie('paymentId', payment.id);
				var redirectUrl;
			    for(var i=0; i < payment.links.length; i++) {
			      var link = payment.links[i];
			      if (link.method === 'REDIRECT') {
			        redirectUrl = link.href;
			      }
			    }
			    res.status(200).send(redirectUrl);
			}
		});
	},
	executePayment: function (req, res) {
		productService.executePayment(req.cookies.paymentId, req.query.PayerID, req.cookies.username, function (error, payment) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.clearCookie('paymentId');
				res.redirect('http://localhost/#/profile');
				//res.status(200).json(payment);
			}
		});
	},
	cancelPayment: function (req, res) {
		res.status(200).send("The payment got canceled");
	}
}

module.exports = ProductRouter;