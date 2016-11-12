var gulp = require('gulp');

gulp.task('build', [], function () {
	return gulp.src('src/pages/**/*.html')
		.pipe(gulp.dest('dist'))
		;
});
