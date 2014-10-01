'use strict';

var gulp     = require('gulp');
var path     = require('path');
var $        = require('gulp-load-plugins')();
var config   = require('configly').setConfig(path.join(__dirname, 'config'));
$.collection = require('./lib/collection');


gulp.task('default', ['watch']);


// gulp build
// ==========
gulp.task('build', [
  'styles',
  'scripts',
  'static',
  'content'
]);


// gulp watch
// ==========
gulp.task('watch', [
  'styles.watch',
  'scripts.watch',
  'static.watch',
  'content.watch',
  'server.watch'
]);


// gulp newpost
// ============
var inquirer = require('inquirer');
var moment   = require('moment');
gulp.task('newpost', function (done) {
  inquirer.prompt([
    { type: 'input', name: 'title', message: 'Title' }
  ], function (answers) {
    var now = moment();
    answers.date = now.format('DD MMM YYYY');
    var nowPath = now.format('YYYY/MM/DD');
    var slug = answers.title.toLowerCase().replace(/ /g, '-');
    gulp.src('src/templates/post.md')
      .pipe($.template(answers))
      .pipe($.rename(slug + '.md'))
      .pipe($.conflict('./'))
      .pipe(gulp.dest('./content/' + nowPath))
      .on('finish', function () { done(); });
  });
});


// gulp styles
// ===========
var styles = config.get('build.styles');
gulp.task('styles', function () {
  return gulp.src(styles.src)
    .pipe($.sourcemaps.init())
      .pipe($.concat(styles.file))
      .pipe($.less({ paths: styles.inc }))
      .pipe($.pleeease())
    .pipe($.sourcemaps.write('../maps'))
    .pipe(gulp.dest(styles.dest));
});
gulp.task('styles.watch', ['styles'], function () {
  gulp.watch(styles.watch, ['styles']);
});


// gulp scripts
// ============
var scripts = config.get('build.scripts');
gulp.task('scripts', function () {
  return gulp.src(scripts.src)
    .pipe($.sourcemaps.init())
      .pipe($.concat(scripts.file))
      .pipe($.uglify())
    .pipe($.sourcemaps.write('../maps'))
    .pipe(gulp.dest(scripts.dest));
});
gulp.task('scripts.watch', ['scripts'], function () {
  gulp.watch(scripts.watch, ['scripts']);
});


// gulp static
// ===========
var assets = config.get('build.static');
gulp.task('static', function () {
  return gulp.src(assets.src).pipe(gulp.dest(assets.dest));
});
gulp.task('static.watch', ['static'], function () {
  gulp.watch(assets.src, ['static']);
});


// gulp content
// ============
var content = config.get('build.content');
gulp.task('content', function () {
  return gulp.src(content.src)
    .pipe($.frontMatter({property: 'data'}))
    .pipe($.markdown())
    .pipe($.htmlmin())
    .pipe($.data(content.process))
    .pipe($.collection(content.collection))
    .pipe($.data(function (file) {
      file.data.cssPath = '/css/' + styles.file;
      file.data.jsPath  = '/js/'  + scripts.file;
      file.data.base    = config.get('build.base');
      return file.data;
    }))
    .pipe($.jade())
    .pipe($.rename(function (path) {
      if (path.basename === 'index') { return; }
      path.dirname += '/' + path.basename;
      path.basename = 'index';
    }))
    .pipe(gulp.dest(content.dest));
});
gulp.task('content.watch', ['content'], function () {
  gulp.watch([content.src, 'src/templates/**/*.jade'], ['content']);
});


// gulp server
// ===========
gulp.task('server', function(done) {
  var connect = require('connect');
  connect()
    .use(require('serve-static')('dist'))
    .listen(8000, done);
});
gulp.task('server.watch', ['server'], function() {
  var server = $.livereload();
  gulp.watch('dist/**').on('change', function(file) {
    server.changed(file.path);
  });
});
