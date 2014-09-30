'use strict';

var fs      = require('fs');
var path    = require('path');
var glob    = require('glob');
var lib     = require('bower-files')();
var version = require('../package').version;
var root    = path.resolve(__dirname, '../');

lib.css = lib.css || [];
lib.js  = lib.js  || [];

module.exports = {
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
  content: {
    src: 'content/**/*.md',
    dest: 'dist/',
    watch: 'content/**/*.md',
    options: {
      frontMatter: {},
      marked: {},
      data: function (file) {
        file.frontMatter.content = String(file._contents);
        file._contents = templates[file.frontMatter.template];
        return file.frontMatter;
      },
      jade: {}
    }
  }
};
