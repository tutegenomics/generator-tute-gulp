/**
 * Utility for generating the script header that is put at the top of our production files
 */

var wrap = require('gulp-wrap');
var pkgDetails = require('./package-details');


function scriptHeader() {
	var packageVersion = pkgDetails.getPackageVersion() + '-' + process.env.NODE_ENV;

	var scriptsHeader =
		'/* Tute Genomics, all rights reserved.' + '\n' +
		'* Version: ' + packageVersion + '\n' +
		'* Generated on: ' + new Date() + '\n' +
		'*/\n';

	return scriptsHeader;
}

module.exports = function writeScriptHeader() {
	return wrap(
		scriptHeader() + '(function(){<%= contents %>})();'
	);
};
