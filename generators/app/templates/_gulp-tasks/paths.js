/**
 * All of the application paths and files that are needed for the build process
 */

var path = require('path');
var bowerPaths = require('./bower-paths');


const ROOT_DIR = '.';
const ROOT = path.normalize( path.resolve(ROOT_DIR) );
const APP_ROOT = path.join(ROOT, 'app');
const DIST_ROOT = path.join(ROOT, 'dist');


var paths = {
    root: ROOT,

    src: {
        root: APP_ROOT,
        mainView: path.join(APP_ROOT, 'index.ejs'),
        views: path.join(APP_ROOT, '**/*.html'),
        scripts: [ path.join(APP_ROOT, '*.js'), path.join(APP_ROOT, '**/*.js') ],
        styles: path.join(APP_ROOT, 'styles'),
        stylesSASS: path.join(APP_ROOT, 'styles', '**/*.scss'),

        //order is relevant here
        vendor: bowerPaths.getBowerJSPaths().concat(/* add more deps here */)
    },

    dist: {
        root: DIST_ROOT,
        styles: path.join(DIST_ROOT, 'styles'),
        scripts: path.join(DIST_ROOT, 'scripts'),
        views: path.join(DIST_ROOT, 'views'),
    }

};


module.exports = paths;
