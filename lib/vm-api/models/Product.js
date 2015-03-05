'use strict';

var mysql = require('../../data/db_mysql/product');


var Product = {
  add: function (name, number, username, callback) {
  	mysql.addProduct(name, number, username, function (error, result) {
  		if (error) {
  			callback(error, null);
  		} else {
        callback(null, result);
      }
      return;
  	});
  },
  set: function (name, number, username, callback) {
    mysql.setProduct(name, number, username, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  },
  get: function(name, username, callback) {
    mysql.getProduct(name, username, function (error, rows) {
    	if (error) {
    		callback(error);
    	} else {
    		callback(null, rows);    		
    	}
      return;
    });
  },
  delete: function(username, callback) {
    mysql.deleteProduct(username, function (error, result) {
    	if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  }
};

module.exports = Product;