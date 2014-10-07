'use strict';

var fs      = require('fs');
var path    = require('path');
var glob    = require('glob');
var lib     = require('bower-files')();
var version = require('../package').version;
var root    = path.resolve(__dirname, '../');

lib.css = lib.css || [];
lib.js  = lib.js  || [];

/*
var toRemove = ['jquery.js', 'bootstrap.js'];
lib.js = lib.js.filter(function (item) {
  var keepItem = true;
  toRemove.map(function (remove) {
    keepItem = keepItem && item.indexOf(remove) === -1;
  });
  return keepItem;
});
// */

var templates = require('../lib/templates');

var collections = {};

var config = {
  resetTemplates: function () {
    templates = require('../lib/templates');
  },
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
              path: '/' + data.path.replace('.html', '/'),
              description: 'Log all the things.',
              items: data.page,
              totalPages: data.pages.length,
              totalItems: data.collection.length
            };
            if (data.index === 0) { file.data.path += '1/'; }
            file.contents = templates.collection;
          }
        }
      },
      end: function (collectionData) {
        collections.content = collectionData;
      }
    },
    category: {
      collectionKey: 'category',
      mainPath: 'category/[collection].html',
      pagePath: 'category/[collection]/[page].html',
      data: function (file, data) {
        var prettyName = data.name
          .split('-')
          .map(function (word) {
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
          })
          .join(' ');
        file.data = {
          title: prettyName,
          index: data.index,
          path: '/' + data.path.replace('.html', '/'),
          description: 'Categorized items',
          items: data.page,
          totalPages: data.pages.length,
          totalItems: data.collection.length
        };
        if (data.index === 0) { file.data.path += '1/'; }
        file.contents = templates.collection;
      },
      end: function (collectionData) {
        collections.categories = collectionData;
      }
    },
    tags: {
      collectionKey: 'tags',
      mainPath: 'tags/[collection].html',
      pagePath: 'tags/[collection]/[page].html',
      data: function (file, data) {
        var prettyName = data.name
          .split('-')
          .map(function (word) {
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
          })
          .join(' ');
        file.data = {
          title: prettyName,
          index: data.index,
          path: '/' + data.path.replace('.html', '/'),
          description: 'Tagged items',
          items: data.page,
          totalPages: data.pages.length,
          totalItems: data.collection.length
        };
        if (data.index === 0) { file.data.path += '1/'; }
        file.contents = templates.collection;
      },
      end: function (collectionData) {
        collections.tags = collectionData;
      }
    },
    data: function (file) {
      file.data.cssPath     = '/css/' + config.styles.file;
      file.data.jsPath      = '/js/'  + config.scripts.file;
      file.data.base        = config.base;
      file.data.collections = collections;
      return file.data;
    }
  }
};

module.exports = config;

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
