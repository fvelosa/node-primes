var currentPrimeLimit = 0; // on cache
var futurePrimeLimit = 1; // on the queue	
var primesCache = [];
var jobFactory = require('../queue/jobFactory');

module.exports = {
	get: get
};

// If prime is not in cache then creates a job in the queue
function get(to, algorithm) {
	if (to <= currentPrimeLimit) {
		var i = searchPrime(to);
		return primesCache.slice(0, i + 1);
	} else if (to > futurePrimeLimit) {
		
		// Adds to the queue only when its not already there
		jobFactory({
			from: futurePrimeLimit + 1,
			to: to,
			algorithm: algorithm
		}, put);
		futurePrimeLimit = to;
	} else {
		console.log('Request already in the queue (to, queue) =>', to, futurePrimeLimit);
	}
}

// Puts the result in the cache
function put(result, jobData) {
	console.log('Put in cache jobData =>', jobData);

	// Compared to Array.prototype.push.apply, concat avoids exciding maximum stack size too early
	primesCache = primesCache.concat(result);
	currentPrimeLimit = jobData.to;
}

// Uses pi(x) to have an estimate of the position and then searches for the first prime in the range
function searchPrime(number) {
	if (number === 0) {
		return 0;
	}
	var index = pi(number);

	// Verifies if exceeded primesCache limit due to rounding
	index = index >= primesCache.length - 1 ? primesCache.length - 1 : index;

	// Searches up
	while (primesCache[index] < number && index < primesCache.length) {
		index++;
	}

	// Searches down
	while (primesCache[index] > number && index > 0) {
		index--;
	}

	return index;
}

// Returns an estimate of the position of the prime number using n/log n
function pi(x) {
	return Math.round(x / Math.log(x));
}