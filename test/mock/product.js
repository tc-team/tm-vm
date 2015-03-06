'use strict';

var Product = {
  add: function (name, number, username, callback) {
  	var result = 1;
    return callback(null, result);
  },
  set: function (name, number, username, callback) {
    var result = 1;
    return callback(null, result);
  },
  get: function(name, username, callback) {
    var result = [{
      number: 3
    }];
    return callback(null, result);
  },
  delete: function(username, callback) {
    var result = 1;
    return callback(null, result);
  }
};

module.exports = Product;