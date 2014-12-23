'use strict';

var path = require('path');
var lib  = require('bower-files')();
var pkg  = require('../package');

var config = {
  dest: 'dist',
  src: 'src',
  styles: {
    lib: lib.css || [],
    file: 'app-' + pkg.version + '.min.css',
    dir: 'css'
  },
  scripts: {
    lib: lib.js || [],
    file: 'app-' + pkg.version + '.min.js',
    dir: 'js'
  }
};

config.styles.path  = ['', config.styles.dir, config.styles.file].join('/');
config.scripts.path = ['', config.scripts.dir, config.scripts.file].join('/');

module.exports = config;
