//dependencies
var gulp = require('gulp');
var fs = require('fs');
var path = require('path');

//plugins
//loads all 3rd party gulp-* plugins
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');

//gulp tasks
var paths = require('./gulp-tasks/paths.js');
var assetPaths = require('./gulp-tasks/asset-paths.js');
var env = require('./gulp-tasks/env.js');
var pkgDetails = require('./gulp-tasks/package-details.js');
var spaServer = require('./gulp-tasks/spa-server.js');
var streamErrNotif = require('./gulp-tasks/stream-err-notif.js');
var revManifest = require('./gulp-tasks/rev-manifest.js');
var taskBlocks = require('./gulp-tasks/task-blocks.js');
var scriptHeader = require('./gulp-tasks/script-header.js');


/**
 * Tasks
 */

gulp.task('serve', function() {
	spaServer().start();
});


gulp.task('index', function() {
	var version = pkgDetails.getPackageVersion();
	var assets = assetPaths.htmlPaths; //use defaults by default (hehe)

	//construct html asset paths
	if(env.isNotDev()) {
		var revManifest = require('./dist/rev-manifest.json');
		var fileNames = assetPaths.assetFileNames; //alias for convenience
		assets.mainCSS = assetPaths.getAssetPath(paths.dist.styles, revManifest[fileNames.mainCSS]);
		assets.appJS = assetPaths.getAssetPath(paths.dist.scripts, revManifest[fileNames.appJS]);
		assets.vendorJS = assetPaths.getAssetPath(paths.dist.scripts, revManifest[fileNames.vendorJS]);
	}

	return gulp.src(paths.src.mainView)
		.pipe(streamErrNotif())
		.pipe( $.ejs({
			env: env.ENV,
			version: version,
			assets: assets
		}) )
		.pipe($.if(env.is('prod'), $.minifyHtml()))
		.pipe(gulp.dest(paths.dist.root));
});


gulp.task('html', function() {
	return gulp.src(paths.src.views)
		.pipe(streamErrNotif())
		.pipe($.changed(paths.dist.views))
		.pipe($.if(env.isNotDev(), $.minifyHtml()))
		.pipe(gulp.dest(paths.dist.views));
});


gulp.task('css', function() {
	return gulp.src( path.join(paths.src.styles, 'main.scss') )
		.pipe(streamErrNotif())
		.pipe($.changed(paths.dist.styles))
		.pipe(taskBlocks.sass())
		.pipe(gulp.dest(paths.dist.styles))
		//write to manifest
		.pipe($.if(env.isNotDev(), revManifest()))
		.pipe($.if(env.isNotDev(), gulp.dest(paths.dist.root)));
});


gulp.task('cleanDist', function(done) {
	del([ paths.dist.root + '/*' ], done);
});


gulp.task('lint', function() {
	return gulp.src(paths.src.scripts)
		.pipe(streamErrNotif())
		.pipe(taskBlocks.jshint());
});


gulp.task('javascript', function() {
	return gulp.src(paths.src.scripts)
		.pipe(streamErrNotif())
		.pipe($.changed(paths.dist.scripts))
		.pipe($.ngAnnotate())
		.pipe($.concat(assetPaths.assetFileNames.appJS))
		.pipe($.babel())
		.pipe(taskBlocks.ugRev())
		.pipe($.if(env.isNotDev(), scriptHeader()))
		.pipe(gulp.dest(paths.dist.scripts))
		//now do the manifest file
		.pipe($.if(env.isNotDev(), revManifest()))
		.pipe($.if(env.isNotDev(), gulp.dest(paths.dist.root)));
});


gulp.task('vendorJS', function() {
	return gulp.src(paths.src.vendor)
		.pipe($.concat(assetPaths.assetFileNames.vendorJS))
		.pipe(taskBlocks.ugRev())
		.pipe(gulp.dest(paths.dist.scripts))
		//now write to manifest file
		.pipe($.if(env.isNotDev(), revManifest()))
		.pipe($.if(env.isNotDev(), gulp.dest(paths.dist.root)));
});


gulp.task('reload', function() {
	//have to .pipe() to trigger a reload
	return gulp.src(paths.src.mainView, {read: false})
		.pipe($.livereload());
});


gulp.task('watch', function() {
	$.livereload.listen();

	$.watch(paths.src.mainView, function() {
		runSequence('index', 'reload');
	});

	$.watch(paths.src.views, function() {
		runSequence('html', 'reload');
	});

	$.watch(paths.src.stylesSASS, function() {
		runSequence('css', 'reload');
	});

	$.watch(paths.src.scripts, function() {
		runSequence(['lint', 'javascript'], 'reload');
	});

});




/**
 * Sequences
 */

gulp.task('build-scripts', function(done) {
	//only lint in dev env
	var jsSubSeq = ['vendorJS', 'javascript'];

	if(env.is('dev')) {
		jsSubSeq.push('lint');
	}

	runSequence(jsSubSeq, done);
});


gulp.task('build-index', function(done) {
	//these have to be sequential so they can write to rev-manifest.json
	runSequence('javascript', 'vendorJS', 'css', 'index', done);
});



/**
 * Builds
 */

//concat tasks on here as needed for specific env builds
var baseTasks = [
	'build-scripts',
	'index',
	'html',
	'css'
];


//local default task for development
gulp.task('default', baseTasks.concat(['watch', 'serve']));

gulp.task('build', ['cleanDist'], function(done) {
	runSequence(['build-index', 'html'], done);
});
