var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var convertEncoding = require('fd-gulp-convert-encoding');
var replace = require('gulp-replace');


gulp.task('default', function(){
  
});



/*************************************************
	*NEG 编写时目录结构，转化成NEG发布时目录结构。
*************************************************/
var buildFolder = "../05_Build/"
var sourceFolder  ="../01_NEG/"
var NVersion = "NEG.0.2.2.js";


var coreFiles = [
	sourceFolder+"_Core/Core/NEG.js",
	sourceFolder+"_Core/Cast/CastBeginner.js",
	sourceFolder+"_Core/Cast/String.js",
	sourceFolder+"_Core/Cast/Array.js",
	sourceFolder+"_Core/Cast/Caster.js",
	sourceFolder+"_Core/Cast/CastEnder.js",
	sourceFolder+"_Core/Core/Base/Base.js",
	sourceFolder+"_Core/Core/Event/Event.js",
	//utility
	sourceFolder+"_Core/Utility/Utility.js",
	sourceFolder+"_Core/Utility/Utility.Environment.js",
	sourceFolder+"_Core/Utility/Utility.Array.js",
	sourceFolder+"_Core/Utility/Utility.Encoding.js",
	sourceFolder+"_Core/Utility/Utility.String.js",
	//VersionControl
	sourceFolder+"_Core/Core/VersionControl.js",
	//resume Base
	sourceFolder+"_Core/Core/Base/Require.js",
	sourceFolder+"_Core/Core/Base/Module.js",
	sourceFolder+"_Core/Core/Base/Run.js",
	//BOM
	sourceFolder+"_Core/BOM/Event/DOMEvent.js",
	sourceFolder+"_Core/BOM/Event/DOMReady.js",
	sourceFolder+"_Core/BOM/LoadJS.js",
	sourceFolder+"_Core/BOM/Utility/IsHTMLElement.js",
	sourceFolder+"_Core/Core/Init.js",
]


gulp.task("concat-NEG",function(){
	gulp.src(coreFiles)
		.pipe(convertEncoding('utf-8'))
		.pipe(replace("[$isDebug$]","false"))
		.pipe(replace("[$NEGFileName$]",NVersion))
		.pipe(replace("[$baseURL$]","(window.Web.Config.Environment.Url.HttpCache + window.Web.Config.Environment.Path.Scripts+'USA/NeweggJS/')"))
		.pipe(concat(NVersion)).pipe(gulp.dest(buildFolder));
});

gulp.task("concat-Widget",function(){
	gulp.src(sourceFolder+"NEG/**/*.js")
		.pipe(convertEncoding('utf-8'))
		.pipe(gulp.dest(buildFolder+"/Test/"));

})