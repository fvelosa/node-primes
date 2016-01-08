module.exports = primeFactory;

function primeFactory(algorithm) {
	switch (algorithm) {
	case 'atkin':
		return require('./sieve-atkin');
	case 'eratosthenes':
		return require('./sieve-eratosthenes');
	default:
		return require('./sequential');
	}
}