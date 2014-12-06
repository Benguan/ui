var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var convertEncoding = require('fd-gulp-convert-encoding');
var replace = require('gulp-replace');

var isProduction = gulp.env.type ==="production";
console.log(isProduction);
var negbuilder = require("./neg-builder")(isProduction);


gulp.task('default', function(){
  
});


gulp.task("build-neg",function(){
	negbuilder.start();
})

