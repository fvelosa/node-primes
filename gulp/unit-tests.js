// Dependencies
var gulp = require('gulp');
var mocha = require('gulp-mocha');

// Task
gulp.task('unit-tests', function () {
	return gulp.src('routes/**/*.spec.js')
		.pipe(mocha({
				bail: false,
				reporter: "nyan"
			}).on('error', function () {})
			//do nothing
		);
});

gulp.task('watch:unit-tests', function () {
	gulp.watch(['app.js', 'routes/**/*.js'], ['unit-tests']);
});