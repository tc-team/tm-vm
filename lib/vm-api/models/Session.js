'use strict';

var redis = require('../../data/db_redis/user');

var Session = {
  add: function (username, sid, callback) {
    redis.setSID(username, sid, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  },
  get: function (username, callback) {
    redis.getSID(username, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  },
  delete: function (username, callback) {
    redis.deleteSID(username, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  }
};

module.exports = Session;