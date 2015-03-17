
'use strict';

var express = require('express');
var router = express.Router();
var app = express();
var config = require('../config');

var user_router = require('./vm-api/routes/User');
var memo_router = require('./vm-api/routes/Memo');
var product_router = require('./vm-api/routes/Product');
var session_router = require('./vm-api/routes/Session');
var token_router = require('./vm-api/routes/Token');
var target_router = require('./vm-api/routes/Target.js');
var tile_router = require('./vm-api/routes/Tile.js');

var bodyParser = require('body-parser');
var multer = require('multer'); 
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(multer({
	dest: './memos/',
	rename: function (fieldname, filename) {
	    return fieldname;
	}
}));
app.use(cookieParser(config.session.secret, config.session.cookie));

app.use(function (req, res, next) {
  	res.set({
					  'Access-Control-Allow-Origin': 'http://' + config.web_server.host,
					  'Access-Control-Allow-Credentials': true,
					  'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, Origin, Access-Control-Allow-Origin',
					  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
					});
  next();
});

app.use(session({
	secret: config.session.secret,
	name: config.session.name,
	resave: false,
	saveUninitialized: true,
	cookie: {
		path: config.session.cookie.path,
		httpOnly: config.session.cookie.httpOnly,
		expires: new Date(Date.now() + 1000*3600*24*10*365)
	}
}));


app.use(router);

router.get('/user', user_router.readUser);
router.post('/user', user_router.createUser);
router.put('/user', user_router.updateUser);
router.delete('/user', user_router.deleteUser);

router.get('/memo', memo_router.readMemos);
router.get('/memo/:id', memo_router.readMemo);
router.post('/memo', memo_router.createMemo);
router.put('/memo/:id', memo_router.updateMemo);
router.delete('/memo/:id', memo_router.deleteMemo);

router.get('/session', session_router.checkSession);
router.post('/session', session_router.createSession);
router.delete('/session', session_router.deleteSession);

router.get('/token/:value', token_router.readToken);
router.post('/token', token_router.createToken);

router.get('/product/:name', product_router.getProduct);
router.get('/product/:name/price', product_router.getPrice);

router.post('/payment', product_router.createPayment);
router.get('/payment/execute', product_router.executePayment);
router.get('/payment/cancel', product_router.cancelPayment);

router.post('/target', target_router.createTarget);
router.get('/target/:longitude/:latitude', target_router.readTarget);
router.get('/target', target_router.readAllTargets);
router.put('/target/:id', target_router.updateTarget);
router.delete('/target/:id', target_router.deleteTarget);

router.get('/tile/:zoom/:x/:y', tile_router.readTile);
router.get('/tile/:zoom/:x/:y/:width/:height', tile_router.readTiles);

app.use(function(req, res) {
	res.status(404).send("Page Not Found");
});

app.start = function() {
	app.listen(config.server.port, config.server.host);
	console.log('Server listening ' + config.server.host + ' on port ' + config.server.port);
};

module.exports = app;