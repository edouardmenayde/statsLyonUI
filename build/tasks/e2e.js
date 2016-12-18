const gulp = require('gulp');
const paths = require('../paths');
const to5 = require('gulp-babel');
const plumber = require('gulp-plumber');
const webdriverUpdate = require('gulp-protractor').webdriver_update;
const webdriverStandalone = require('gulp-protractor').webdriver_standalone;
const protractor = require('gulp-protractor').protractor;
const del = require('del');
const compilerOptions = require('../babel-options');
const assign = Object.assign || require('object.assign');

// for full documentation of gulp-protractor,
// please check https://github.com/mllrsohn/gulp-protractor
gulp.task('webdriver-update', webdriverUpdate);
gulp.task('webdriver-standalone', ['webdriver-update'], webdriverStandalone);

gulp.task('clean-e2e', function() {
  return del(paths.e2eSpecsDist + '*');
});

// transpiles files in
// /test/e2e/src/ from es6 to es5
// then copies them to test/e2e/dist/
gulp.task('build-e2e', ['clean-e2e'], function() {
  return gulp.src(paths.e2eSpecsSrc)
      .pipe(plumber())
      .pipe(to5(assign({}, compilerOptions.commonjs())))
      .pipe(gulp.dest(paths.e2eSpecsDist));
});

// runs build-e2e task
// then runs end to end tasks
// using Protractor: http://angular.github.io/protractor/
gulp.task('e2e', ['build-e2e'], function(cb) {
  return gulp.src(paths.e2eSpecsDist + '**/*.js')
    .pipe(protractor({
      configFile: 'protractor.conf.js',
      args: ['--baseUrl', 'http://127.0.0.1:9000']
    }))
    .on('end', function() { process.exit(); })
    .on('error', function(e) { throw e; });
});
