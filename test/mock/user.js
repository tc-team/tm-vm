'use strict';

var User = {
  add: function (username, password, email, callback) {
    var result = {
      affectedRows: 1
    };
    return callback(null, result);
  },
  get: function (username, callback) {
    var result = [{
      username: username,
      password: '81dc9bdb52d04dc20036dbd8313ed055',
      email: 'mail@mail.com'
    }];
    return callback(null, result);
  },
  setPass: function (username, newPassword, callback) {
    return callback(null, 1);
  },
  setEmail: function (username, newEmail, callback) {
    return callback(null, 1);
  },
  delete: function (username, callback) {
    return callback(null, 1);
  }
};

module.exports = User;