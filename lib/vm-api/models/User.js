'use strict';

var mysql = require('../../common/db_clients/mysql_profile');
var mockUserModel = require('../../../test/mock/user');

var isTest = (process.env.NODE_ENV == 'test') ? true : false;

var User = {
  add: function (username, password, email, callback) {
    mysql.addUser(username, password, email, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  },
  get: function (username, callback) {
    mysql.getUser(username, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  },
  set: function (username, newPassword, newEmail, callback) {
    mysql.setUser(username, newPassword, newEmail, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  },
  delete: function (username, callback) {
    mysql.deleteUser(username, function (error, result) {
      if (error) {
        callback(error, null);        
      } else {
        callback(null, result);        
      }
      return;
    });
  }
};

module.exports = isTest ? mockUserModel : User;