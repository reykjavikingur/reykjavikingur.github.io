var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var del = require('del');
var gutil = require('gulp-util');
var _ = require('underscore');
var chalk = require('chalk');
var execFile = require('child_process').execFile;

gulp.task('serve', ['watch'], function (cb) {
	browserSync.init({
		server: {
			baseDir: 'dist'
		},
		files: ['dist/**/*']
	}, cb);
});

gulp.task('clean', [], function () {
	return del([
		'dist/**/*.html',
		'dist/assets/**/*'
	]);
});

gulp.task('build', ['build:static', 'build:styles', 'build:scripts', 'build:pages']);
gulp.task('watch', ['watch:static', 'watch:styles', 'watch:scripts', 'watch:pages']);

gulp.task('build:static', [], function () {
	return gulp.src('src/static/**/*')
		.pipe(gulp.dest('dist/assets'))
		;
});
gulp.task('watch:static', ['build:static'], function () {
	gulp.watch('src/static/**/*', ['build:static']);
});

gulp.task('build:styles', [], function () {
	return gulp.src('src/styles/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/assets/styles'))
		;
});
gulp.task('watch:styles', ['build:styles'], function () {
	gulp.watch('src/styles/**/*.scss', ['build:styles']);
});

gulp.task('build:scripts', [], function () {
	return gulp.src('src/scripts/**/*.js')
		.pipe(gulp.dest('dist/assets/scripts'))
		;
});
gulp.task('watch:scripts', ['build:scripts'], function () {
	gulp.watch('src/scripts/**/*.js', ['build:scripts']);
});

gulp.task('build:pages', [], function (cb) {
	execFile('node', ['pages.js', 'src/pages', 'dist'], {}, function (err, stdout, stderr) {
		if (err) {
			gutil.log(chalk.red(err.message));
		}
		if (stderr) {
			gutil.log(chalk.red(stderr));
		}
		cb();
	});
});
gulp.task('watch:pages', ['build:pages'], function () {
	gulp.watch(['src/pages/**/*', 'pages.js'], ['build:pages']);
});
