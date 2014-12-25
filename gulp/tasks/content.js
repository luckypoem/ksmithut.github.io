'use strict';

var gulp      = require('gulp');
var path      = require('path');
var gulpsmith = require('gulpsmith');
var config    = require('../config');
var $         = require('../plugins');
var m         = require('load-metalsmith-plugins')();

module.exports = function () {
  return gulp.src('content/**/*.md')
    //.pipe($.plumber())
    .pipe($.frontMatter()).on('data', frontMatterAssign)
    .pipe(gulpsmith()
      .on('error', console.log.bind(console))
      .metadata({
        jsFile: config.scripts.path,
        cssFile: config.styles.path,
        site: {
          name: 'ksmithut',
          base: 'http://ksmithut.github.io'
        }
      })
      // Exclude those with 'draft: true'
      .use(m.drafts())
      // Validate some properties
      .use(m.validate({
        title: { exists: true, type: 'String' },
        description: { exists: true, type: 'String' }
      }))
      // Markdown parsing
      .use(m.markdown({
        gfm: true,
        tables: true,
        smartypants: true
      }))
      // Set up permalinks
      .use(m.branch()
        .pattern('20**/**/*.html')
        .use(function (files, metalsmith, done) {
          Object.keys(files).forEach(function (filepath) {
            var date = filepath.match(/^(\d{4})\/(\d{2})\/(\d{2})/);
            var dateString = [date[1], date[2], date[3]].join('-');
            var newDate = new Date(dateString);
            newDate.setMinutes(
              newDate.getMinutes() + newDate.getTimezoneOffset()
            );
            files[filepath].date = newDate;
          });
          done();
        })
        .use(m.permalinks({
          pattern: ':date/:title',
          date: 'YYYY/MM/DD'
        }))
      )
      // Conditionally apply metadata to posts
      .use(m.filemetadata([
        {
          pattern: '20*/**/*.html',
          metadata: {
            collection: 'posts',
            template: 'post.jade'
          }
        },
        {
          pattern: 'projects/**/*.html',
          metadata: {
            collection: 'projects',
            template: 'project.jade'
          }
        }
      ]))
      // Set up the collections
      .use(m.collections({
        posts: {sortBy: 'date', reverse: true},
        projects: {sortBy: 'title'}
      }))
      // Makes the urls clean without any .html junk
      .use(function (files) {
        Object.keys(files).forEach(function (filepath) {
          files[filepath].path = filepath;
        });
      })
      // Paginate the collections
      .use(m.pagination({
        'collections.posts': {
          perPage: 10,
          template: 'posts.jade',
          first: 'posts/index.html',
          path: 'posts/:num/index.html',
          pageMetadata: {
            title: 'Posts',
            noindex: true
          }
        },
        'collections.projects': {
          perPage: 10,
          template: 'projects.jade',
          first: 'projects/index.html',
          path: 'projects/:num/index.html',
          pageMetadata: {
            title: 'Projects',
            noindex: true
          }
        }
      }))
      // Add word count and timing stuff for scrolling
      .use(m.wordCount())
      // Make the cleanpath
      .use(function (files) {
        Object.keys(files).forEach(function (filepath) {
          var file = files[filepath];
          var path = file.path.replace('index.html', '');
          if (path) { path = '/' + path; }
          files[filepath].cleanPath = path;
        });
      })
      // Process the templates
      .use(m.templates({
        engine: 'jade',
        directory: 'src/templates'
      }))
      // Add global build date
      .use(m.buildDate())
    )
    // END metalsmith
    .pipe(gulp.dest(config.dest));
};

function frontMatterAssign(file) {
  assign(file, file.frontMatter);
  delete file.frontMatter;
}

function assign(dest, src) {
  Object.keys(src).forEach(function (key) {
    dest[key] = src[key];
  });
}

module.exports.watch = [
  'content/**/*.md',
  'src/templates/**/*.jade'
];
