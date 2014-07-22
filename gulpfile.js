'use strict';

var gulp    = require('gulp');
var path    = require('path');
var express = require('express');
var p       = require('gulp-load-plugins')();

// Style Guide Builder/Server
// ==========================
(function () {
  var mainDir  = path.join(__dirname, 'docs/styleguide');
  var styleDir = path.join(mainDir, 'css');
  var port     = 8001;

  gulp.task('styleguide', [
    'styleguide.styles:watch',
    'styleguide.server'
  ], function () {
    p.util.log('styleguide server localhost:' + port);
  });

  gulp.task('styleguide.styles', function () {
    return gulp.src(path.join(styleDir, 'main.less'))
      .pipe(p.less({paths: [path.join(styleDir, 'inc')]}))
      .pipe(p.csso())
      .pipe(gulp.dest(styleDir));
  });

  gulp.task('styleguide.styles:watch', ['styleguide.styles'], function () {
    gulp.watch(path.join(styleDir, '**/*.less'), ['styleguide.styles']);
  });

  gulp.task('styleguide.server', function (done) {
    var app = express();
    app.use(express.static(mainDir));
    app.listen(port, done);
  });

})(); // END Style Guide Builder/Server
