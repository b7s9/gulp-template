const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
// const eslint = require('gulp-eslint');

gulp.task('compile-js', ()=> {
	return gulp.src('src/js/*.js') // or 'src/**/*.js'
		.pipe( sourcemaps.init() )
		.pipe( babel({
			presets:['env']
		}) )
		.pipe( concat('main.js') )
		.pipe( sourcemaps.write('../maps/') )
		.pipe( gulp.dest('build/js/') )
})

// gulp.task('lint-js', ()=> {
// 	return gulp.src('src/js/*.js')
// 		.pipe( eslint() )
// 		.pipe( eslint.format() )
// 		.pipe( eslint.failAfterError() )
// })