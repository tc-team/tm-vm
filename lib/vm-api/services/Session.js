'use strict';

var userModel = require('../models/User');
var sessionModel = require('../models/Session');

var md5 = require('MD5');

var Session = {
  addSession: function (username, userPassword, sid, callback) {
    userModel.get(username, function (error, rows) {
      if (error) {
        callback(error, null);
      } else {
        var isRegistered = (rows.length == 1) ? true : false;
        if (isRegistered) {
          var isCorrectlyData = (username == rows[0].username && rows[0].password == md5(userPassword));
          if (isCorrectlyData) {
            sessionModel.add(username, sid, function (error, result) {
              if (error) {
                callback(error, null);
              } else {
                callback(null, rows);
              }
              return;
            });
          } else {
            callback(null, false);
          }
        } else {
          callback(null, false);
        }
        return;
      }
    });
  },
  deleteSession: function (username, callback) {    
    sessionModel.delete(username, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  },
  checkSession: function (username, sid, callback) {
    sessionModel.get(username, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        if (sid == result) {
          callback(null, true);
        } else {
          callback(null, false);          
        }
      }
      return;
    });
  }
}

module.exports = Session;