var kue = require('kue');
var cluster = require('cluster');
var kue_port = process.env.KUE_PORT || '3030';
var clusterWorkerSize = require('os').cpus().length;

// Start cluster processes only on master
console.log('Creates queue with number (cores) => ', clusterWorkerSize);

// Creates the kue that will listen to the workers
kue.app.listen(kue_port);

// Creates the worker processes
for (var i = 0; i < clusterWorkerSize; i++) {
	cluster.fork();
}