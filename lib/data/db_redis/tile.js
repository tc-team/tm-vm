'use strict';

var config = require('../../../config').redis;
var redis = require("redis"),
  client = redis.createClient(config);

exports.setTileStatus = function(hash, key, value, callback) {
  client.hset("user:tile:" + hash, "tile:tileStatus:" + key, value, function (error, result) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};

exports.getTileStatus = function(hash, key, callback) {
  client.hget("user:tile:" + hash, "tile:tileStatus:" + key, function (error, result) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};

exports.deleteTileStatus = function(hash, callback) {
  client.del("user:tile:" + hash, function (error, result) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, error);
    }
  });
};