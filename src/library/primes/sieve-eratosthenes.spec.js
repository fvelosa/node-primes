var primeCalculator = require('./sieve-eratosthenes');
var commonTests = require('./common.spec.js');

describe('Test sieve-eratosthenes prime algorithm', commonTests(primeCalculator));