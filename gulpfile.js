'use strict';

var gulp    = require('gulp');
var path    = require('path');
var $       = require('gulp-load-plugins')();
var config  = require('configly').setConfig(path.join(__dirname, 'config'));

var styles = config.get('build.styles');
gulp.task('styles', function () {
  return gulp.src(styles.src)
    .pipe($.sourcemaps.init())
      .pipe($.concat(styles.file))
      .pipe($.less({ paths: styles.inc }))
      .pipe($.pleeease())
    .pipe($.sourcemaps.write('../maps'))
    .pipe($.gzip())
    .pipe(gulp.dest(styles.dest));
});
gulp.task('styles.watch', ['styles'], function () {
  gulp.watch(styles.watch, ['styles']);
});


var scripts = config.get('build.scripts');
gulp.task('scripts', function () {
  return gulp.src(scripts.src)
    .pipe($.sourcemaps.init())
      .pipe($.concat(scripts.file))
      .pipe($.uglify())
    .pipe($.sourcemaps.write('../maps'))
    .pipe($.gzip())
    .pipe(gulp.dest(scripts.dest));
});
gulp.task('scripts.watch', ['scripts'], function () {
  gulp.watch(scripts.watch, ['scripts']);
});


var content   = config.get('build.content');
var templates = require('./lib/templates');
gulp.task('content', function () {
  return gulp.src(content.src)
    .pipe($.frontMatter())
    .pipe($.marked())
    .pipe($.htmlmin())
    .pipe($.data(function (file) {
      file.frontMatter.content = String(file._contents);
      file._contents = templates[file.frontMatter.template];
      return file.frontMatter;
    }))
    .pipe($.jade())
    .pipe(gulp.dest(content.dest));
});
