var primeCalculator = require('./sequential');
var commonTests = require('./common.spec.js');

describe('Test sequential prime algorithm', commonTests(primeCalculator));