// Algorithm from http://brianhan.tumblr.com/post/46454945029

module.exports = sequential;

function sequential(min, max) {
	var sieve = [],
		i, j, primes = [];
	for (i = 2; i <= max; ++i) {
		if (!sieve[i]) {
			// i has not been marked -- it is prime
            if (i >= min) {
			     primes.push(i);
            }
			for (j = i << 1; j <= max; j += i) {
				sieve[j] = true;
			}
		}
	}
	return primes;
}