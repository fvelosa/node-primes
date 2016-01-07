module.exports = primeFactory;

function primeFactory(algorithm) {
	switch (algorithm) {
	case undefined:
	case 'sequential':
		return require('./sequential');
	case 'atkin':
		return require('./sieve-atkin');
	case 'eratosthenes':
		return require('./sieve-eratosthenes');
	default:
		return undefined;
	}
}