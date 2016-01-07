var expect = require('chai').expect;

module.exports = commonPrimeTests;

function commonPrimeTests(primeCalculator) {
	return function () {
		it('Shoudl return [] on 0', function () {
			expect(primeCalculator(0, 0).length).to.equal(0);
		});

		it('Should return [] on 1', function () {
			expect(primeCalculator(1, 1).length).to.equal(0);
		});

		it('Should return [2] on 2', function () {
			expect(primeCalculator(1, 2).length).to.equal(1);
			expect(primeCalculator(1, 2)[0]).to.equal(2);			
		});

		it('Should return [2,3] on 3', function () {
			expect(primeCalculator(1, 3).length).to.equal(2);
			expect(primeCalculator(1, 3)[0]).to.equal(2);
			expect(primeCalculator(1, 3)[1]).to.equal(3);
		});

		it('Should return [2,3] on 4', function () {
			expect(primeCalculator(1, 4).length).to.equal(2);
			expect(primeCalculator(1, 4)[0]).to.equal(2);
			expect(primeCalculator(1, 4)[1]).to.equal(3);
		});

		it('Should return [2,3,5] on 5', function () {
			expect(primeCalculator(1, 5).length).to.equal(3);
			expect(primeCalculator(1, 5)[0]).to.equal(2);
			expect(primeCalculator(1, 5)[1]).to.equal(3);
			expect(primeCalculator(1, 5)[2]).to.equal(5);
		});
		
		it('Should return 25 primes for 100', function () {
			expect(primeCalculator(1, 100).length).to.equal(25);
		});
        
        		
		it('Should return 2 primes for 5 - 10', function () {
			expect(primeCalculator(5, 10).length).to.equal(2);
            expect(primeCalculator(5, 10)[0]).to.equal(5);
			expect(primeCalculator(5, 10)[1]).to.equal(7);
		});
	};
}