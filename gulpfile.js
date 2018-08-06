const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
// const gulpIf = require('gulp-if');
// const argv = require('yargs').argv;
const del = require('del');

const sass = require('gulp-sass');

// --------------------------------------------------------
// HTML
// --------------------------------------------------------

gulp.task('html', ()=> {
	return gulp.src('./src/index.html')
		.pipe( gulp.dest('./build/') )
})

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
	gulp.watch('./src/index.html', ['html'])
})

gulp.task('default', ['watch'])


// --------------------------------------------------------
// STYLE
// --------------------------------------------------------

// gulp.task('css', ()=> {
// 	return gulp.src('src/style/*.+(scss|sass)')
// 		.pipe( sass().on('error', sass.logError) )
// 		.pipe( gulp.dest('./build/css') )
// })




