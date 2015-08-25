/**
 * Utility for getting package.json and bower.json as JS objects
 */

//assume they're in the parent directory
exports.getPackageJSON = function() {
	return require('../package.json');
};

exports.getPackageVersion = function() {
	return exports.getPackageJSON().version;
};

exports.getBowerJSON = function() {
	return require('../bower.json');
};

exports.getBowerVersion = function() {
	return exports.getBowerJSON().version;
};
