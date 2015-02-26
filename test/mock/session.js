'use strict';

var Session = {
  add: function (username, sid, callback) {
    var result = 1;
    return callback(null, result);
  },
  get: function (username, callback) {
    var result = 1;
    return callback(null, result);
  },
  delete: function (username, callback) {
    var result = 1;
    return callback(null, result);
  }
};

module.exports = Session;