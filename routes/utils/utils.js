module.exports = {
	errorFactory: errorFactory
};

function errorFactory(code, msg) {
	var http = require('http');
	var errStatus = isNaN(code) ? 500 : code;

	var err = new Error(msg || http.STATUS_CODES[errStatus]);
	err.status = errStatus;
	return err;
}