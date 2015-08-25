/**
 * All of the file paths/names needed by the browser
 */

var path = require('path'),
    bowerPaths = require('./bower-paths'),
    paths = require('./paths');


/**
 * Strips out 'dist' and everything before from a path. Because it's the root, asset URLs won't need it.
 * Makes the path suitable for use on front-end, not by node internally
 * @param  {String} filepath
 * @param  {String} filename
 * @return {String} asset path for use in index.html
 */
function getAssetPath(filepath, filename) {
    if(!filename) {
        //nulls will result in an incorrect file path, so throw error here to break out of a build
        throw new ReferenceError('filename is not defined.');
    }
    var pathArr = filepath.split('/');
    var newPath = pathArr.splice( pathArr.indexOf('dist') + 1, pathArr.length - 1 ).join('/');
    return path.join(newPath, filename);
}

//all files needed by index.html
var assetFileNames = {
    mainCSS: 'main.css',
    appJS: 'all.bundle.js',
    vendorJS: 'vendor.bundle.js'
};

module.exports = {

    assetFileNames: assetFileNames,

    //These are the default, dev paths. Prod will have dynamically generated hashed file paths
    //This has to be a seperate entry on the paths object so it can reference `paths`
    htmlPaths: {
        mainCSS: getAssetPath(paths.dist.styles, assetFileNames.mainCSS),
        appJS: getAssetPath(paths.dist.scripts, assetFileNames.appJS),
        vendorJS: getAssetPath(paths.dist.scripts, assetFileNames.vendorJS)
    },

    getAssetPath: getAssetPath

};
