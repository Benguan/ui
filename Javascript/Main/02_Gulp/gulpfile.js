var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


var buildFolder = "../05_Build/"
var sourceFolder  ="../01_NEG/"

gulp.task('default', function(){
  
});


gulp.task("hint",function(){
	gulp.src(sourceFolder+"_Core/*.js")
		.pipe(jshint())
		.pipe(jshint.reporter("default"));
});