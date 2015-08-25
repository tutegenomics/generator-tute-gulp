/**
 * Utility that contains deals with the current build environment (dev, stage, etc)
 */

 //environment constant, dev by default
 const ENV = (process.env.NODE_ENV || 'dev').toLowerCase();
 //make sure only valid environments are allowed
 const validEnvs = ['dev', 'stage', 'production'];

/**
 * for running blocks of code only in the matching environments
 * @param {String...} strings of environments to run code in
 * @return {Boolean}
 */
function envIs() {
	var args = [].slice.call(arguments);
	return args.some(function(item) {
		return item === ENV;
	});
}

/**
 * convenience function for logic that runs in all non-dev environments
 * @return {Boolean}
 */
function isNotDev() {
    return ENV !== 'dev';
}

/**
 * checks if current env is a valid one
 * throws Error if it isn't, return null if it is
 */
function checkEnv() {
	if(validEnvs.indexOf(ENV) === -1) {
		throw new Error('Invalid environment: ' + ENV + '. ENV must equal one of these: ' + validEnvs.join(', ') + '.');
	}
}

module.exports = {
	is: envIs,
    isNotDev: isNotDev
	ENV: ENV,
	checkEnv: checkEnv
};
