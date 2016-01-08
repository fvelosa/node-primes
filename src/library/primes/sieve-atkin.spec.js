var primeCalculator = require('./sieve-atkin');
var commonTests = require('./common.spec.js');

describe('Test sieve-atkin prime algorithm', commonTests(primeCalculator));