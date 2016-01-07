// Dependencies
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');

// Task
gulp.task('server', function () {
	// configure nodemon
	nodemon({
		// the script to run the app
		script: './bin/www',
		ext: 'js jade',
		ignore: ["*.spec.js", "gulp/*"],
	}).on('restart', function () {
		// when the app has restarted, run livereload.
		gulp.src('app.js')
			.pipe(notify('Reloading page, please wait...'));
	});
});