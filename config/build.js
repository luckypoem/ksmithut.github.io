'use strict';

var fs      = require('fs');
var path    = require('path');
var glob    = require('glob');
var lib     = require('bower-files')();
var version = require('../package').version;
var root    = path.resolve(__dirname, '../');

lib.css = lib.css || [];
lib.js  = lib.js  || [];

var templates = require('../lib/templates');

module.exports = {
  base: 'http://ksmithut.github.io',
  lib: lib,
  styles: {
    src: lib.css.concat([
      'src/styles/**/*.less',
      '!src/styles/inc/**'
    ]),
    dest: 'dist/css/',
    file: 'main.' + version + '.min.css',
    watch: 'src/styles/**/*.less',
    inc: [path.join(root, 'src/styles/inc')]
  },
  scripts: {
    src: lib.js.concat('src/scripts/**/*.js'),
    dest: 'dist/js/',
    file: 'main.' + version + '.min.js',
    watch: 'src/scripts/**/*.js'
  },
  static: {
    src: 'src/assets/**',
    dest: 'dist/'
  },
  content: {
    src: 'content/**/*.md',
    dest: 'dist/',
    watch: 'content/**/*.md',
    process: function (file) {
      file.data.tags    = convertTags(file.data.tags);
      file.data.date    = convertDate(file.data.date);
      file.data.path    = convertPath(file.path, file.base);
      file.data.content = String(file._contents);
      file._contents    = templates[file.data.template];
      return file.data;
    },
    collection: {
      collections: {
        posts: {
          data: function (file, data) {
            file.data = {
              title: 'Web Logs',
              index: data.index,
              path: data.path.replace('.html', '/'),
              description: 'Log all the things.',
              items: data.page,
              totalPages: data.pages.length,
              totalItems: data.collection.length
            };
            file.contents = templates.collection;
          }
        }
      }
    }
  }
};

function convertTags(tags) {
  if (!tags) { return []; }
  return tags.split(',').map(function (tag) { return tag.trim(); });
}

function convertDate(dateStr) {
  return dateStr ? new Date(dateStr) : undefined;
}

function convertPath(rawPath, base) {
  rawPath = rawPath.replace(base, '');
  rawPath = path.dirname(rawPath) + '/' + path.basename(rawPath, '.html');
  return '/' + rawPath + '/';
}
