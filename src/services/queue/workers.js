var queue = require('kue').createQueue();
var primeFactory = require('../../library/primes/primeFactory');

console.log('Cluster process  started =>');

// Worker function that when called will execute the processFn function
queue.process('primes', 4, function (job, done) {
	console.log('Started processing queue job => ', job.data);

	processFn(job.data, done);
});

// Process function, could changed to a dynamic fn
function processFn(jobData, done) {
	console.log('Queue process function called =>', jobData);
	try {
		done(null, primeFactory(jobData.algorithm)(jobData.from, jobData.to));
	} catch (e) {
		done(new Error(e));
	}
}