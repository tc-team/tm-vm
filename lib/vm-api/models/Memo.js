'use strict';

var mysql = require('../../data/db_mysql/memo');

var Memo = {
  add: function (id, name, pathToFile, username, callback) {
  	mysql.addMemo(id, name, pathToFile, username, function (error, result) {
  		if (error) {
  			callback(error, null);
  		} else {
        callback(null, result);
      }
      return;
  	});
  },
  getAll: function(username, callback) {
    mysql.getAllMemos(username, function (error, memos) {
    	if (error) {
    		callback(error);
    	} else {
    		callback(null, memos);
    	}
      return;
    });
  },
  set: function (id, newName, username, callback) {
    mysql.setMemo(id, newName, username, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  },
  delete: function(id, username, callback) {
    mysql.deleteMemo(id, username, function (error, result) {
    	if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  },
  deleteAll: function(username, callback) {
    mysql.deleteAllMemos(username, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  }
};

module.exports = Memo;