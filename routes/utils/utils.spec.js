var utils = require('./utils');
var expect = require('chai').expect;

describe('Test utils', function() {
	describe('Test errorFactory', function() {
		var errorFactory = utils.errorFactory;
		
		it('empty error has 500 status and message', function() {
			var error = errorFactory();
			
			expect(error.status).to.equal(500);
			expect(error.message).to.equal('Internal Server Error');
		});
		
		it('empty message gets status codes', function() {
			var error = errorFactory(400);
			
			expect(error.status).to.equal(400);
			expect(error.message).to.equal('Bad Request');
		});
		
		it('message overlaps default status code', function() {
			var error = errorFactory(400, 'Other bad request message');
			
			expect(error.status).to.equal(400);
			expect(error.message).to.equal('Other bad request message');
		});
		
		it('return non standard status with empty message', function() {
			var error = errorFactory(1800);
			
			expect(error.status).to.equal(1800);
			expect(error.message).to.equal('');
		});
		
		it('does not break with other types', function() {
			var error = errorFactory('aaa');
			
			expect(error.status).to.equal(500);
			expect(error.message).to.equal('Internal Server Error');
		});
	});
});