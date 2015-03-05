'use strict';
var config = require('../../../config/index');
var userModel = require('../models/User');
var productModel = require('../models/Product');
var paypal = require('paypal-rest-sdk');
paypal.configure(config.paypal);

var memoPrice = productModel.default.memo.price;

var ProductService = {
  getProduct: function (name, username, callback) {
    productModel.get(name, username, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result[0]);
      }
      return;
    });
  },
  createPayment: function (name, number, callback) {
    var total = memoPrice * number;
    
    var payment = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "redirect_urls": {
        "return_url": "http://localhost:3000/payment/execute",
        "cancel_url": "http://localhost:3000/payment/cancel"
      },
      "transactions": [{
        "amount": {
          "total": total,
          "currency": "USD"
        },
        "item_list": {
          "items": [{
            "quantity": number,
            "name": name.toUpperCase(),
            "price": memoPrice,
            "currency": "USD"
          }]
        },
        "description": "Payment for additional memos"
      }]
    };
    paypal.payment.create(payment, function (error, payment) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, payment);
      }
      return;
    });
  },
  executePayment: function (paymentId, payerId, username, callback) {
    var details = { "payer_id": payerId };
    paypal.payment.execute(paymentId, details, function (error, payment) {
      if (error) {
        callback(error, null);
      } else {
        productModel.get('memo', username, function (error, value) {
          if (error) {
            callback(error, null);
          } else {
            var newNumber = value[0].number + parseInt(payment.transactions[0].item_list.items[0].quantity);
            productModel.set('memo', newNumber, username, function (error, result) {
              if (error) {
                callback(error, null);
              }
              return;
            });
          }
        });
        callback(null, payment);
      }
    });
  }
}

module.exports = ProductService;