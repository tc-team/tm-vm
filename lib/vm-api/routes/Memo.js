'use strict';

var memoService = require('../services/Memo');
var config = require('../../../config');
var fs = require('fs');

var MemoRouter = {
	readMemo: function (req, res) {
		var options = {
	    root:  process.cwd() + '/memos/',
	    dotfiles: 'deny',
	    headers: {
	        'x-timestamp': Date.now(),
	        'x-sent': true
	    }
	  };

	  var fileName = req.params.id;
	  res.sendFile(fileName, options, function (err) {
	    if (err) {
	      console.log(err);
	      res.status(err.status).end();
	    }
	    else {
	      console.log('Sent:', fileName);
	    }
	  });
	},
	readMemos: function (req, res) {
		memoService.getMemos(req.cookies.username, function (error, result) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200).send(result);
			}
		});
	},
	createMemo: function (req, res) {
		var pathToFile = 'http://'+ config.server.host + ':'+ config.server.port + '/memo/' + req.body.id;
		memoService.addMemo(req.body.id, req.body.name, pathToFile, 'Pasha', function (error, result) {
			if (error) { 
				res.status(500).send(error);
			} else {
				res.status(200).send(result);
			}
		});
	},
	deleteMemo: function (req, res) {
		memoService.deleteMemo(req.params.id, req.cookies.username, function (error, result) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200).send('Memo successfully deleted');
			}
		});
	}
}

module.exports = MemoRouter;