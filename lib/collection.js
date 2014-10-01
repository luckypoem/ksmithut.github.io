'use strict';

var gutil     = require('gulp-util');
var through   = require('through');
var defaults  = require('defaults');
var File      = gutil.File;

var collectionReplace = '[collection]';
var pageReplace = '[page]';

var streaming = new gutil.PluginError(
  'gulp-collection',
  'Streaming not supported'
);

var typeSorts = {
  date: function (order, a, b) {
    if (order === 'desc') { return b - a; }
    else                  { return a - b; }
  },
  string: function (order, a, b) {
    if (order === 'desc') { return b.localeCompare(a); }
    else                  { return a.localeCompare(b); }
  },
  number: function (order, a, b) {
    if (order === 'desc') { return b - a; }
    else                  { return a - b; }
  },
  undefined: function (order, a, b) {
    gutil.log(gutil.colors.red('gulp-collection'), 'unsupported sort type');
    return 0;
  }
};

function getType(obj) {
  if (obj instanceof Date && !isNaN(obj.valueOf())) { return 'date'; }
  if (typeof obj === 'string' || obj instanceof String) { return 'string'; }
  if (typeof obj === 'number') { return 'number'; }
  return 'undefined';
}

module.exports = function (options) {
  /* jshint validthis: true */
  // This is for the 'this' in bufferContents and endStream

  options = defaults(options, {
    dataKey: 'data',
    sortBy: 'date',
    order: 'desc',
    path: '[collection].html',
    page: '[collection]/[page].html',
    perPage: 10,
    data: function (data) { return {}; },
    collections: {}
  });

  var collections = {};

  function bufferContents(file) {
    if (file.isStream()) { return this.emit('error', streaming); }

    var data = file[options.dataKey];
    if (data && data.collection) {
      collections[data.collection] = collections[data.collection] || [];
      collections[data.collection].push(data);
    }
    this.push(file);
  }

  function endStream() {
    var self = this;
    Object.keys(collections).map(function (collectionName) {
      var collection = collections[collectionName];
      collection.sort(sortCollection(collectionName));
      var perPage    = getOption(collectionName, 'perPage');
      var pages      = chunk(collection, perPage);
      var pagePath   = getOption(collectionName, 'page');
      var homePath   = getOption(collectionName, 'path')
        .replace(collectionReplace, collectionName);
      pages.map(function (page, index) {
        var getData     = getOption(collectionName, 'data');
        var newPagePath = pagePath
          .replace(pageReplace, index + 1)
          .replace(collectionReplace, collectionName);
        var shareObject = {
          collectionName: collectionName,
          collection: collection,
          pages: pages,
          page: page,
          index: index
        };
        self.emit('data', newCollectionPage(newPagePath, shareObject, getData));
        if (index === 0) {
          self.emit('data', newCollectionPage(homePath, shareObject, getData));
        }
      });
    });
    this.emit('end');
  }

  function sortCollection(collectionName) {
    var sortBy = getOption(collectionName, 'sortBy');
    var order  = getOption(collectionName, 'order');
    return function (contentA, contentB) {
      var type = getType(contentA[sortBy]);
      return typeSorts[type](order, contentA[sortBy], contentB[sortBy]);
    };
  }

  function newCollectionPage(path, shareObject, getData) {
    var newPage = new File({ path: path });
    shareObject.path = path;
    getData(newPage, shareObject);
    return newPage;
  }

  function getOption(collection, option) {
    var globalDefault = options[option];
    var collOptions   = options.collections[collection];
    var collDefault   = collOptions ? collOptions[option] : null;
    return collDefault || globalDefault;
  }

  return through(bufferContents, endStream);

};

function chunk(array, chunkSize) {
  return [].concat.apply([],
    array.map(function (elem, i) {
      return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
    })
  );
}
