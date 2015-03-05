'use strict';

var config = require('../../../config').redis;
var redis = require("redis"),
  client = redis.createClient(config);

exports.setTileId = function(key, value, callback) {
  client.set("tile:tileId:" + key, value, function (error, result) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};

exports.getTileId = function(key, callback) {
  client.get("tile:tileId:" + key, function (error, result) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};

exports.deleteTileId = function(key, callback) {
  client.del("tile:tileId:" + key, function (error, result) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, error);
    }
  });
};