'use strict';

var fs = require('fs');
var path = require('path');
var async = require('async');
var http = require('http');
var url = require('url');
var config = require('../../config/').cache;

exports.createStorage = function(dirPath, callback) {
	fs.lstat(dirPath, function(error, stats) {
		if (error && error.code == 'ENOENT') {
			fs.mkdir(path.normalize(dirPath), function(error) {
				if (error && error.code == 'ENOENT') {
					exports.createStorage(path.dirname(dirPath), function(error, result) {
						if (error){
							callback(error, null);
						} else {
							exports.createStorage(dirPath, callback);
						}
					});
				} else {
					callback();
				}  
			});
		} else {
			callback(null, stats);
		}
	});
};
 
exports.removeCache = function(dirPath, callback) {
	fs.readdir(dirPath, function(error, files) {
		if (error) {
			callback(error, null);
		} else {
			async.each(files, function(file, callback) {
				file = dirPath + '/' + file;
				fs.stat(file, function(error, stat) {
					if (error) {
						callback(error);
					}
					if (stat.isDirectory()) {
						exports.removeCache(file, callback);
					} else {
						fs.unlink(file, function(error) {
							if (error) {
								callback(error);
							}
							callback(null);
						});
					}
				});
			}, function(error) {
				if (error) { 
					callback(error);
				}
				fs.rmdir(dirPath, function(error) {
					callback(error);
				});
			});
		}
	});
};

exports.cacheFile = function(dirPath, fileName, uri, callback) {
	var options = {
		host: url.parse(uri).host,
		port: config.port,
		path: url.parse(uri).pathname,
		headers: config.headers
	}

	var file = fs.createWriteStream(dirPath + fileName);
	http.get(options, function(res) {
		res.on('data', function(data) {
			file.write(data);
		});
		res.on('end', function() {
			file.end();
			callback();
		});
		res.on('error', function(error) {
			callback(error);
		});
	});
};

exports.getFile = function(dirPath, fileName, callback) {
	fs.readFile(dirPath + fileName, function(error, data) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, data);
		}
	});
};