'use strict';

var gulp   = require('gulp');
var path   = require('path');
var config = require('../config');
var $      = require('../plugins');

var staticPath = path.join(config.src, 'assets', '**', '*');

module.exports = function () {
  return gulp.src(staticPath)
    .pipe($.plumber())
    .pipe(gulp.dest(config.dest));
};

module.exports.watch = staticPath;
