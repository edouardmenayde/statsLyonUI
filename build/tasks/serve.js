const url         = require('url');
const gulp        = require('gulp');
const browserSync = require('browser-sync');
const fs          = require('fs');
const path        = require('path');

const defaultFile = 'index.html';

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', ['build'], function (done) {
  const folders = ['./.dev', './src'];
  browserSync({
    online: false,
    open  : false,
    port  : 9000,
    server: {
      baseDir   : folders,
      middleware: function (req, res, next) {

        const file     = url.parse(req.url);
        const fileName = file.href.split(file.search ? file.search : '').join('');

        const fileExists = folders.some((folder) => {
          return fs.existsSync(folder + fileName);
        });

        if (!fileExists && fileName.indexOf('browser-sync-client') < 0) {
          req.url = `/${defaultFile}`;
        }

        res.setHeader('Access-Control-Allow-Origin', '*');

        next();
      }
    }
  }, done);
});

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve-bundle', ['bundle'], function (done) {
  const folders = ['./dist'];
  browserSync({
    online: false,
    open  : false,
    port  : 9000,
    server: {
      baseDir   : folders,
      middleware: function (req, res, next) {

        const file     = url.parse(req.url);
        const fileName = file.href.split(file.search ? file.search : '').join('');

        const fileExists = folders.some((folder) => {
          return fs.existsSync(folder + fileName);
        });

        if (!fileExists && fileName.indexOf('browser-sync-client') < 0) {
          req.url = `/${defaultFile}`;
        }

        res.setHeader('Access-Control-Allow-Origin', '*');

        next();
      }
    }
  }, done);
});
