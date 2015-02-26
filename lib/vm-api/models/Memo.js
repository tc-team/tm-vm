'use strict';

var mysql = require('../../common/db_clients/mysql_memo');

var mockMemoModel = require('../../../test/mock/memo');
var isTest = (process.env.NODE_ENV == 'test') ? true : false;

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

module.exports = isTest ? mockMemoModel : Memo;