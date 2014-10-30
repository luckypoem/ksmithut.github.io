'use strict';

var gulp    = require('gulp');
var lib     = require('bower-files')();
var $       = require('gulp-load-plugins')();
var m       = require('load-metalsmith-plugins')();
var pkg     = require('./package');
var dist    = 'dist/';

$.metalsmith        = require('gulpsmith');
m.collectionsTitles = require('./lib/collections-titles');

gulp.task('default', ['watch']);

// ============================================================================
// BUILD
// ============================================================================
gulp.task('build', [
  'assets',
  'scripts',
  'styles',
  'content'
]);

// ============================================================================
// WATCH
// ============================================================================
gulp.task('watch', [
  'assets.watch',
  'scripts.watch',
  'styles.watch',
  'content.watch',
  'server'
]);

// ============================================================================
// ASSETS
// ============================================================================
gulp.task('assets', function () {
  return gulp.src('src/assets/**')
    .pipe($.plumber())
    .pipe(gulp.dest(dist));
});
gulp.task('assets.watch', ['assets'], function () {
  gulp.watch('src/assets/**', ['assets']);
});

// ============================================================================
// SCRIPTS
// ============================================================================
gulp.task('scripts', function () {
  return gulp.src((lib.js || []).concat('src/scripts/**/*.js'))
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
      .pipe($.concat('app-' + pkg.version + '.min.js'))
      .pipe($.uglify())
    .pipe($.sourcemaps.write('../maps'))
    .pipe(gulp.dest(dist + 'js'));
});
gulp.task('scripts.watch', ['scripts'], function () {
  gulp.watch('src/scripts/**/*.js', ['scripts']);
});

// ============================================================================
// STYLES
// ============================================================================
gulp.task('styles', function () {
  return gulp.src((lib.css || []).concat('src/styles/**/*.styl'))
    .pipe($.plumber())
    .pipe($.stylus({
      use: [require('nib')()],
      sourcemap: {inline: true}
    }))
    .pipe($.sourcemaps.init({loadMaps: true}))
      .pipe($.concat('app-' + pkg.version + '.min.css'))
      .pipe($.pleeease())
    .pipe($.sourcemaps.write('../maps'))
    .pipe(gulp.dest(dist + 'css'));
});
gulp.task('styles.watch', ['styles'], function () {
  gulp.watch('src/styles/**/*.styl', ['styles']);
});

// ============================================================================
// CONTENT
// ============================================================================
gulp.task('content', function () {
  return gulp.src('content/**/*.md')
    .pipe($.plumber())
    .pipe($.frontMatter())
    .on('data', function (file) {
      Object.keys(file.frontMatter).forEach(function (key) {
        file[key] = file.frontMatter[key];
      });
      delete file.frontMatter;
    })
    .pipe($.metalsmith()
      .metadata({
        jsFile: '/js/app-' + pkg.version + '.min.js',
        cssFile: '/css/app-' + pkg.version + '.min.css',
        baseUrl: 'http://ksmithut.github.io'
      })
      .use(m.drafts())
      .use(m.globMeta({
        glob: 'blog/**/*.md',
        meta: { template: 'post.hbs' }
      }))
      .use(m.globMeta({
        glob: 'projects/**/*.md',
        meta: { template: 'project.hbs' }
      }))
      .use(m.markdown({
        smartypants: true,
        gfm: true,
        tables: true
      }))
      .use(m.excerpts())
      .use(m.permalinks({
        pattern: ':path/'
      }))
      .use(m.buildDate())
      .use(m.collections({
        posts: {
          pattern: 'blog/**/*.html',
          sortBy: 'date',
          reverse: true
        },
        projects: {
          pattern: 'projects/**/*.html',
          sortBy: 'title',
          reverse: false
        }
      }))
      .use(m.collectionsPaginate({
        posts: {
          perPage: 10,
          template: 'posts.hbs',
          first: 'blog/index.html',
          path: 'blog/page/:num/index.html'
        },
        projects: {
          perPage: 10,
          template: 'projects.hbs',
          first: 'projects/index.html',
          path: 'projects/page/:num/index.html'
        }
      }))
      .use(m.collectionsTitles({
        posts: 'Blog',
        projects: 'Projects'
      }))
      .use(m.templates({
        engine: 'handlebars',
        directory: 'src/templates',
        partials: {
          footer: 'partials/footer',
          header: 'partials/header',
          pagination: 'partials/pagination'
        },
        helpers: require('./lib/handlebar-helpers')
      }))
    )
    .pipe($.minifyHtml())
    .pipe(gulp.dest(dist));
});
gulp.task('content.watch', ['content'], function () {
  gulp.watch(['content/**/*.md', 'src/templates/**/*.hbs'], ['content']);
});

// ============================================================================
// SERVER
// ============================================================================
gulp.task('server', function () {
  require('connect')().use(require('serve-static')(dist)).listen(8000);
  var server = $.livereload();
  gulp.watch(dist + '/**/*').on('change', function(file) {
    server.changed(file.path);
  });
});
