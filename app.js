var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var utils = require('./src/utils/utils');

var routes = require('./routes/index');
var primes = require('./routes/primes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Disable 304 on the browser
app.disable('etag');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/primes', primes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = utils.errorFactory(404, 'Not found');
	next(err);
});

// error handlers
/* jshint ignore:start */
app.use(function (err, req, res, next) {
	res
		.status(err.status || 500)
		.json({
			status: err.status || 500,
			message: err.message
		});
});
/* jshint ignore:end */

module.exports = app;