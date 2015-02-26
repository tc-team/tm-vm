'use strict';

var redis = require('../../common/db_clients/redis_client');

var mockSessionModel = require('../../../test/mock/session');
var isTest = (process.env.NODE_ENV == 'test') ? true : false;

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

module.exports = isTest ? mockSessionModel : Session;