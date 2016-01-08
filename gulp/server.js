// Dependencies
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');

var config = require('../config.js');

// Task
gulp.task('server', function () {
	// configure nodemon
	nodemon({
		// the script to run the app
		script: './server.js',
		ext: 'js jade',
		ignore: ["*.spec.js", "gulp/*"],
		env: {
			NODE_ENV: 'DEVELOPMENT',
			PROTOCOL: config.protocol,
			HOST: config.host,
			PORT: config.port,
			KUE_PORT: config.kue_port
		}
	}).on('restart', function () {
		// when the app has restarted, run livereload.
		gulp.src('app.js')
			.pipe(notify('Reloading page, please wait...'));
	});
});