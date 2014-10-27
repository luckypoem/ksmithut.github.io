'use strict';

var gulp       = require('gulp');
var $          = require('gulp-load-plugins')();
var browserify = require('browserify');
var reactify   = require('reactify');
var uglifyify  = require('uglifyify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');

gulp.task('js', function () {
  return browserify('./src/js/main.js')
    .transform(reactify)
    .transform(uglifyify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'));
});
