'use strict';

var config  = require('../../../config/').mysql;
var mysql = require('mysql');
var connection = mysql.createConnection(config);

connection.connect();

exports.queryMysql = function(sql, callback) {
	connection.query(sql, function(error, result {
		if (error) {
			callback(error, null);
		} else {
			callback(null, result);
		} 
	});
};