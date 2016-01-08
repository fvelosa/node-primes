var primeFactory = require('./primeFactory');
var expect = require('chai').expect;

describe('Test the prime Factory', function () {
	it('should return sequential on undefined', function () {
		expect(primeFactory().name).to.equal('sequential');
	});

	it('should return sequential', function () {
		expect(primeFactory('sequential').name).to.equal('sequential');
	});

	it('should return atkin', function () {
		expect(primeFactory('atkin').name).to.equal('atkin');
	});

	it('should return eratosthenes', function () {
		expect(primeFactory('eratosthenes').name).to.equal('eratosthenes');
	});
	
	it('should return undefined on wrong name', function () {
		expect(primeFactory('error').name).to.equal('sequential');
	});
});