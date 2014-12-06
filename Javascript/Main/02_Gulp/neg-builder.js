var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var convertEncoding = require('fd-gulp-convert-encoding');
var replace = require('gulp-replace');

module.exports = function(isProduction){
	
	var buildFolder = "../05_Build/"+(isProduction?"src/":"source/");
	var sourceFolder  ="../01_NEG/"
	var NVersion = "NEG.0.2.3.js";


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

	var concatCore = function(){
			gulp.src(coreFiles)
				.pipe(convertEncoding('utf-8'))
				.pipe(replace("[$isDebug$]",isProduction?"false":"true"))
				.pipe(replace("[$NEGFileName$]",NVersion))
				.pipe(replace("[$baseURL$]",isProduction?"(window.Web.Config.Environment.Url.HttpCache + window.Web.Config.Environment.Path.Scripts+'USA/NeweggJS/')":""))
				.pipe(concat(NVersion)).pipe(gulp.dest(buildFolder));
		};

	var buildNeg = function(){
			gulp.src([sourceFolder+"**/*.js","!"+sourceFolder+"/_Core/","!"+sourceFolder+"/_Core/**"])
				.pipe(convertEncoding('utf-8'))
				.pipe(rename(function(path){
					if(!path){return };
					switch(path.dirname){
						case "NEG/Widget/PropertyManager/View/src":
						case "NEG/Widget/PropertyManager/Model/src":
							path.dirname=path.dirname="NEG/Widget/PropertyManager/";
							break;
						case "NEG/Widget/Form/src":
							path.dirname=path.dirname="NEG/Widget/Form/";
						default:
							path.dirname=path.dirname.replace(/(.*)\/.+?\/src/i,"$1");
							break;
					}
				}))
				.pipe(gulp.dest(buildFolder));
		}

	return {
		start:function(){
			concatCore();
			buildNeg();
		}
	}
}




