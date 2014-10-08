'use strict';

var gutil = require('gulp-util');
var through = require('through');
var getFiles = require('../get-files');

var streamingError = new gutil.PluginError(
  'gulp-collection',
  'Streaming not supported'
);

module.exports = function (options) {
  /* jshint validthis: true */
  // This is for the 'this in bufferContents and endStream'

  if (!options.path) {
    throw new gutil.PluginError('gulp-jade-includes', '`foo` required');
  }

  function bufferContents(file) {
    if (file.isStream()) { return this.emit('error', streamingError); }

    var origContents = String(file.contents);
    this.push(file);
  }

  return through(bufferContents);
};
