'use strict';

var config = require('../../../config').redis;
var redis = require("redis"),
  client = redis.createClient(config);

exports.setSID = function (key, value, callback) {
	client.set("user:sid:" + key, value, function (error, result) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
    return;
  });
};

exports.getSID = function (key, callback) {
	client.get("user:sid:" + key, function (error, result) {
		if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
    return;
	});
};

exports.deleteSID = function (key, callback) {
	client.del("user:sid:" + key, function (error, result) {
		if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
	});
};