'use strict';

var Memo = {
  add: function (id, name, pathToFile, username, callback) {
  	var result = 1;
    return callback(null, result);
  },
  getAll: function(username, callback) {
    var result = [
      {
        id: 1,
        name: 'sssss2',
        date: '2014-12-24 18:12:18',
        pathToFile: './mp3/1.mp3',
      }
    ];
    return callback(null, result);
  },
  delete: function(id, username, callback) {
    var result = {
      affectedRows: 1
    };
    return callback(null, result);
  },
  deleteAll: function(username, callback) {
    var result = 1;
    return callback(null, result);
  }
};

module.exports = Memo;