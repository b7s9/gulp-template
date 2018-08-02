const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
// const gulpIf = require('gulp-if');
// const argv = require('yargs').argv;
const del = require('del');

// --------------------------------------------------------
// JS
// --------------------------------------------------------

gulp.task('js', ()=> {
	del(['./build/js/*.+(js|map)']);

	return gulp.src('./src/js/*.js') // or 'src/**/*.js'
		
		// lint
		.pipe( eslint( {fix:true} ) )
		.pipe( eslint.format() )
		.pipe( eslint.failAfterError() )

		// compile
		.pipe( sourcemaps.init() )
		// .pipe( gulpIf(argv.production, concat('main.min.js'), concat('main.js') ) )
		.pipe( concat('main.min.js') )
		.pipe( babel({
			presets:['env']
		}) )
		.pipe( uglify() )
		.pipe( sourcemaps.write('.') )
		.pipe( gulp.dest('./build/js') )
})

// gulp.task('lint-js', ()=> {
// 	return gulp.src('./src/js/*.js')
// 		.pipe( eslint( {fix:true} ) )
// 		.pipe( eslint.format() )
// 		.pipe( eslint.failAfterError() )
// })

gulp.task('watch', ()=>{
	gulp.watch('./src/js/**/*.js', ['js'])
})


// --------------------------------------------------------
// STYLE
// --------------------------------------------------------

// gulp.task('compile-css', ()=> {
// 	return gulp.src('src/sass/*.+(scss|sass)')
// 		.pipe()
// })