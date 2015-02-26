'use strict';

var userModel = require('../models/User');
var memoModel = require('../models/Memo');
var productModel = require('../models/Product');
var tokenModel = require('../models/Token');
var Promise = require("bluebird");


var md5 = require('MD5');

var User = {
  addUser: function (username, password, email, callback) {
    var hash = md5(password);
    userModel.add(username, hash, email, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        var defaultProduct = {
          name: 'memo',
          number: productModel.default.memo.number
        }
        productModel.add(defaultProduct.name, defaultProduct.number, username, function (error, prodResult) {
          if (error) {
            callback(error, null);
          } else {
            callback(null, result);              
          }
          return;
        });
      }
      return;
    });
  },
  getUser: function (username, callback) {
    userModel.get(username, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result[0]);
      }
      return;
    });
  },
  deleteUser: function (username, callback) {
    productModel.delete(username, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        memoModel.deleteAll(username, function (error, result) {
          if (error) {
            callback(error, null);
          } else {
            tokenModel.deleteAll(username).then(function () {
                userModel.delete(username, function (error, result) {
                  if (error) {
                    callback(error, null);
                  } else {
                    callback(null, result);
                  }
                  return;
                });
              return;
            });
          }
          return;
        });
      }
      return;
    }); 
  },
  setUser: function (username, password, email, callback) {
    userModel.set(username, password, email, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  }
}

module.exports = User;