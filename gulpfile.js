const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const livereload = require('gulp-livereload');

const static = './src/';
const build = '/build';

gulp.task('watch', function () {
	gulp.watch(`${static}scss/**/*.scss`, ['style']);
});

gulp.task('style', function () {
	gulp.src('src/scss/main.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest('build/css'))
		.pipe(livereload());
});

gulp.task('default', ['style', 'watch']);