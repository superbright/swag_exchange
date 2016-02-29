const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const livereload = require('gulp-livereload');
const webpack = require('webpack-stream');
const named = require('vinyl-named');
const path = require('path');

const static = './src/';
const build = '/build';

gulp.task('watch', function () {
	gulp.watch('src/scss/**/*.scss', ['style']);
});

gulp.task('style', function () {
	gulp.src('src/scss/main.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest('build/css'))
		.pipe(livereload());
});

gulp.task('js', function() {
	return gulp.src([
			'babel-polyfill',
			'src/js/main.js'
		])
		.pipe(plumber())
		.pipe(named())
		.pipe(webpack({
			watch: true,
			module: {
				loaders: [{
					loader: 'babel-loader',
					test: /\.js$/,
					exclude: [
					  path.resolve(__dirname, 'node_modules'),
					],
					query: {
						plugins: ['transform-runtime'],
						presets: ['es2015', 'stage-0', 'react'],
					}
				}]
			}      
		}))
		.pipe(gulp.dest('build/js'));
});


gulp.task('default', ['style','js', 'watch']);