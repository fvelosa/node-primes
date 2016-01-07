var express = require('express');
var primeFactory = require('./utils/primes/primeFactory');
var router = express.Router();
var utils = require('./utils/utils');

/* GET primes listing. */
router.get('/:id', function (req, res, next) {

	var number = parseInt(req.params.id, 10);
	var primes;

	if (isNaN(number) || number < 0) {
		next(utils.errorFactory(400, 'Max should be a non negative number'));
	} else {
		var algorithm = primeFactory(req.query.algorithm);

		if (algorithm) {
			primes = algorithm(1, number);

			res.json({
				initial: number,
				total: primes.length,
				primes: primes,
				algorithm: algorithm.name
			});
		} else {
			next(utils.errorFactory(400, 'Algorithm is not defined'));
		}
	}
});

module.exports = router;