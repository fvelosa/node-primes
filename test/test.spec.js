var request = require('supertest');
var config = require('../config.js');
var address = config.protocol + '://' + config.host + ':' + config.port;

describe('GET /', function () {
	it('respond with html main page', function (done) {
		request(address)
			.get('/')
			.set('Accept', 'text/html')
			.expect('Content-Type', 'text/html; charset=utf-8')
			.expect(200, done);
	});
});

describe('GET /primes/x with each algorithm', function () {

	it('error when algorithm is not defined', function (done) {
		request(address)
			.get('/primes/100')
			.query({
				'algorithm': 'error'
			})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect({
				status: 400,
				message: 'Algorithm is not defined'
			})
			.expect(400, done);
	});

	describe('with empty', commonTests());
	describe('with sequential', commonTests('sequential'));
	describe('with atkin', commonTests('atkin'));
	describe('with eratosthenes', commonTests('eratosthenes'));
});

function commonTests(algorithm) {
	return function () {
		it('error when alphanumeric or negative', function (done) {
			request(address)
				.get('/primes/a')
				.query({
					'algorithm': algorithm
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect({
					status: 400,
					message: 'Max should be a non negative number'
				})
				.expect(400, done);
		});


		it('respond empty array for 0', function (done) {
			request(address)
				.get('/primes/0')
				.query({
					'algorithm': algorithm
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect({
					initial: 0,
					total: 0,
					primes: [],
					algorithm: algorithm || 'sequential'
				})
				.expect(200, done);
		});

		it('respond empty array for 1', function (done) {
			request(address)
				.get('/primes/1')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.query({
					'algorithm': algorithm
				})
				.expect({
					initial: 1,
					total: 0,
					primes: [],
					algorithm: algorithm || 'sequential'
				})
				.expect(200, done);
		});

		it('respond 1 for 2', function (done) {
			request(address)
				.get('/primes/2')
				.query({
					'algorithm': algorithm
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect({
					initial: 2,
					total: 1,
					primes: [2],
					algorithm: algorithm || 'sequential'
				})
				.expect(200, done);
		});
	};
}