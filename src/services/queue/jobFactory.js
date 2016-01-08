var kue = require('kue');
var queue = kue.createQueue();

module.exports = jobFactory;

// Creates a job in the queue
function jobFactory(data, callback) {
	console.log('Added new job to queue =>', data);
	
	var job = queue.create('primes', data).removeOnComplete( true ).save();

	job.on('complete', function (result) {
		console.log('Job completed =>', data);
		callback(result, data);
	});
	
	return job;
}