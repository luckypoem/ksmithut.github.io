'use strict';

var gulp   = require('gulp');
var lib    = require('bower-files')();
var $      = require('./lib/gulp-plugins');
var m      = require('./lib/metalsmith-plugins');
var config = require('./config');
var pkg    = require('./package');
var dist   = 'dist/';

// BUILD
// =====
gulp.task('build', [
  'assets',
  'scripts',
  'styles',
  'content'
]);

// WATCH
// =====
gulp.task('watch', [
  'assets.watch',
  'scripts.watch',
  'styles.watch',
  'content.watch'
]);

// ASSETS
// ======
gulp.task('assets', function () {
  return gulp.src(config.assets.src)
    .pipe($.plumber())
    .pipe(gulp.dest(dist + config.assets.dest));
});
gulp.task('assets.watch', ['assets'], function () {
  gulp.watch(config.assets.src, ['assets']);
});

// SCRIPTS
// =======
gulp.task('scripts', function () {
  return gulp.src((lib.js || []).concat(config.scripts.src))
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
      .pipe($.concat('app-' + pkg.version + '.min.js'))
      .pipe($.uglify())
    .pipe($.sourcemaps.write('../maps'))
    .pipe(gulp.dest(dist + config.scripts.dest));
});
gulp.task('scripts.watch', ['scripts'], function () {
  gulp.watch(config.scripts.src, ['scripts']);
});

// STYLES
// ======
gulp.task('styles', function () {
  return gulp.src((lib.css || []).concat(config.styles.src))
    .pipe($.plumber())
    .pipe($.stylus(config.styles.stylus))
    .pipe($.sourcemaps.init({loadMaps: true}))
      .pipe($.concat('app-' + pkg.version + '.min.css'))
      .pipe($.pleeease())
    .pipe($.sourcemaps.write('../maps'))
    .pipe(gulp.dest(dist + config.styles.dest));
});
gulp.task('styles.watch', ['styles'], function () {
  gulp.watch(config.styles.src, ['styles']);
});

// CONTENT
// =======
gulp.task('content', function () {
  return gulp.src(config.content.src)
    .pipe($.plumber())
    .pipe($.frontMatter())
    .on('data', config.content.frontMatterCopy)
    .pipe($.metalsmith()
      .metadata({
        jsFile: '/js/app-' + pkg.version + '.min.js',
        cssFile: '/css/app-' + pkg.version + '.min.css',
        baseUrl: 'http://ksmithut.github.io'
      })
      .use(m.drafts())
      .use(m.globMeta({
        glob: 'blog/**/*.md',
        meta: {
          template: 'post.hbs'
        }
      }))
      .use(m.markdown(config.content.markdown))
      .use(m.excerpts())
      .use(m.permalinks(config.content.permalinks))
      .use(m.buildDate())
      .use(m.collections(config.content.collections))
      .use(m.collectionsPaginate(config.content.collectionsPaginate))
      .use(m.collectionsTitles(config.content.collectionsTitles))
      .use(m.templates(config.content.templates))
    )
    .pipe($.minifyHtml())
    .pipe(gulp.dest(dist + config.content.dest));
});
gulp.task('content.watch', ['content'], function () {
  gulp.watch([config.content.src, 'src/templates/**/*.hbs'], ['content']);
});
