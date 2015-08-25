/**
 * Rev manifest generates a JSON file that contains the original file path and then the new one with a hash.
 * This file is used to dynamically insert the correct file paths into the resulting index.html
 */

var rev = require('gulp-rev');
var paths = require('./paths');

module.exports = function revManifest() {
	return rev.manifest({
		base: paths.dist.root,
		path: paths.dist.root + '/rev-manifest.json',
		merge: true
	});
};
