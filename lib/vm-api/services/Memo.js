'use strict';

var memoModel = require('../models/Memo');
var productModel = require('../models/Product');

var MemoService = {
  addMemo: function (id, name, pathToFile, username, callback) {
    memoModel.getAll(username, function (error, allMemos) {
      if (error) {
        callback(error, null);
      } else {
        productModel.get('memo', username, function (error, rows) {
          if (error) {
            callback(error, null);
          } else {
            if (rows.length != 0) {
              if (allMemos.length < rows[0].number) {
                memoModel.add(id, name, pathToFile, username, function (error, result) {
                  if (error) {
                    callback(error, null);
                  } else {
                    callback(null, 'You have successfully added a new memo');
                  }
                  return;
                });
              } else {
                callback(null, 'no space for new memo');
              }
            } else {
              callback(null, 'username not exist')
            }
          }
          return;
        });
      }
      return;
    });
  },
  getMemos: function (username, callback) {  
    memoModel.getAll(username, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  },
  deleteMemo: function (id, username, callback) {
    memoModel.delete(id, username, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  }  
}

module.exports = MemoService;