const gulp            = require('gulp');
const runSequence     = require('run-sequence');
const changed         = require('gulp-changed');
const plumber         = require('gulp-plumber');
const to5             = require('gulp-babel');
const sourcemaps      = require('gulp-sourcemaps');
const paths           = require('../paths');
const compilerOptions = require('../babel-options');
const assign          = Object.assign || require('object.assign');
const notify          = require('gulp-notify');
const less            = require('gulp-less');
const sass            = require('gulp-sass');

var outputScripts, outputStyles;

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', function () {
  return gulp.src(paths.source)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(changed(outputScripts, {extension: '.js'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(to5(assign({}, compilerOptions.system())))
    .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/src'}))
    .pipe(gulp.dest(outputScripts));
});

// copies changed html files to the output directory
gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(changed(outputScripts, {extension: '.html'}))
    .pipe(gulp.dest(outputScripts));
});

gulp.task('build-sass', function () {
  return gulp.src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass({includePaths: ['node_modules']}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(outputStyles));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function (callback) {
  outputScripts = paths.devRoot + paths.scripts;
  outputStyles  = paths.devRoot + paths.styles;

  return runSequence(
    'clean-dev',
    'unbundle',
    ['build-system', 'build-html', 'build-sass'],
    callback
  );
});

gulp.task('build-dist', function (callback) {
  outputScripts = paths.tmpRoot + paths.scripts;
  outputStyles  = paths.tmpRoot + paths.styles;

  return runSequence(
    ['clean-tmp', 'clean-dist'],
    ['build-system', 'build-html', 'build-sass'],
    callback
  );
});
