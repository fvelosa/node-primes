var express = require('express');
var router = express.Router();
var config = require('../config');
var host = config.protocol + '://' + config.host + ':' + config.port;

/* GET home page. */
router.get('/', function (req, res) {
	res.render('index', {
		title: 'Express',
		host: host
	});
});

module.exports = router;