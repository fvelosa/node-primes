var express = require('express');
var router = express.Router();
var utils = require('../src/utils/utils');
var cache = require('../src/services/cache/cache');

/* GET primes listing */
router.get('/:id', function (req, res, next) {

	var number = parseInt(req.params.id, 10);

	if (isNaN(number) || number <= 1) {
		next(utils.errorFactory(400, 'Max should be a number bigger than 1'));
	} else {
		var primes = cache.get(number, req.query.algorithm);

		if (primes) {
			res.json({
				initial: number,
				total: primes.length,
				primes: primes
			});
		} else {
			res.status(202).send();
		}
	}
});

module.exports = router;