'use strict';

var gulp   = require('gulp');
var path   = require('path');
var config = require('../config');
var $      = require('../plugins');

var stylesPath = path.join(config.src, 'styles', 'main.styl');

module.exports = function () {
  return gulp.src(config.styles.lib.concat(stylesPath))
    .pipe($.plumber())
    .pipe($.stylus({sourcemap: {inline: true}}))
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.concat(config.styles.file))
    .pipe($.pleeease({mqpacker: true}))
    .pipe($.sourcemaps.write('../maps'))
    .pipe(gulp.dest(path.join(config.dest, config.styles.dir)));
};

module.exports.watch = path.join(config.src, 'styles', '**', '*.styl');
