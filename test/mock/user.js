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
  set: function (username, newPassword, newEmail, callback) {
    var result = {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      serverStatus: 2,
      warningCount: 0,
      message: '(Rows matched: 1  Changed: 1  Warnings: 0',
      protocol41: true,
      changedRows: 1
    };
    return callback(null, result);
  },
  delete: function (username, callback) {
    var result = 1;
    return callback(null, result);
  }
};

module.exports = User;