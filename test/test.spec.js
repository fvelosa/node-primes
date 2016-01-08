var request = require('supertest');
var config = require('../config.js');
var address = config.protocol + '://' + config.host + ':' + config.port;
var starting = false;

describe('Integration Tests', function () {
	this.timeout(10000); // Maximum timeout for tests

	// Checks if the server is running, should be included in the script
	before(function (done) {
		request(address)
			// Puts primes in the cache
			.get('/primes/100')
			.end(function (error, res) {
				if (error) {
					console.error('Server is not started, start using \'gulp server\'');
				} else if (res.statusCode !== 200) {
					console.error(res.status, res.message);
					done();
				} else {
					starting = false;
					console.log('Adding numbers to cache');
					// Waits for prime queue to fill the cache, delete in future tests
					setTimeout(done, 1000);
				}
			});
	});

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
		describe('with empty', commonTests());
		describe('with empty', commonTests('error'));
		describe('with sequential', commonTests('sequential'));
		describe('with atkin', commonTests('atkin'));
		describe('with eratosthenes', commonTests('eratosthenes'));
	});
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
					message: 'Max should be a number bigger than 1'
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
					status: 400,
					message: 'Max should be a number bigger than 1'
				})
				.expect(400, done);
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
					status: 400,
					message: 'Max should be a number bigger than 1'
				})
				.expect(400, done);
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
					primes: [2]
				})
				.expect(200, done);
		});

		it('respond 2 for 3', function (done) {
			request(address)
				.get('/primes/3')
				.query({
					'algorithm': algorithm
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect({
					initial: 3,
					total: 2,
					primes: [2, 3]
				})
				.expect(200, done);
		});

		it('respond 25 for 100', function (done) {
			request(address)
				.get('/primes/100')
				.query({
					'algorithm': algorithm
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(function (res) {
					delete res.body.primes;
				})
				.expect({
					initial: 100,
					total: 25
				})
				.expect(200, done);
		});
	};
}