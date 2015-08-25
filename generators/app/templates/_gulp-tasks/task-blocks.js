/**
 * These are common, reusable sections of gulp tasks
 */

var lazypipe = require('lazypipe');
var gulpif = require('gulp-if');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var env = require('./env');


module.exports = {

    jshint: lazypipe()
        .pipe(jshint)
        .pipe(jshint.reporter, stylish),

    ugRev: lazypipe()
        .pipe(function() {
            return gulpif(env.isNotDev(), uglify());
        })
        .pipe(function() {
            return gulpif(env.isNotDev(), rev());
        }),

    sass: lazypipe()
        .pipe(sass)
        .pipe(autoprefixer, { browsers: ['> 5% in US'] })
        .pipe(function() {
            return gulpif(env.isNotDev(),
                minifyCSS({ processImport: false })
            );
        })
        .pipe(function() {
            return gulpif(env.isNotDev(),
                rev()
            );
        })

};
