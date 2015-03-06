'use strict';

var Promise = require("bluebird");

var Token = {
  add: function (token) {
  	return new Promise(function (resolve) {
  		var result = 1;
      resolve(result);
    });
  },
  get: function(username) {
    return new Promise(function (resolve) {
  		var result = [
        {
          value: '59204cb74856bb61ac2b2cb050e7c2cc'
        }
      ];
      resolve(result);
    });
  },
  delete: function(id) {
    return new Promise(function (resolve) {
  		var result = 1;
      resolve(result);
    });
  },
  deleteAll: function(username) {
    return new Promise(function (resolve) {
  		var result = 1;
      resolve(result);
    });
  }
};

module.exports = Token;