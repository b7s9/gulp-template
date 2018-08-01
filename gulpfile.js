const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const eslint = require('gulp-eslint');
const gulpIf = require('gulp-if');

gulp.task('compile-js', ()=> {
	return gulp.src('src/js/*.js') // or 'src/**/*.js'
		.pipe( sourcemaps.init() )
		.pipe( concat('main.js') )
		.pipe( babel({
			presets:['env']
		}) )
		.pipe( sourcemaps.write('maps/') )
		.pipe( gulp.dest('build/') )
})

gulp.task('lint-js', ()=> {
	return gulp.src('src/js/*.js')
		.pipe( eslint( {fix:true} ) )
		.pipe( eslint.format() )
		.pipe( eslint.failAfterError() )
})