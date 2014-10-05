'use strict';

var gutil      = require('gulp-util');
var through    = require('through');
var defaults   = require('defaults');
var arrayify   = require('./arrayify');
var sortByType = require('./sort-by-type');
var chunkArray = require('./chunk-array');
var File       = gutil.File;
var gError     = gutil.PluginError;
var collectionReplace = '[collection]';
var pageReplace       = '[page]';

// Error to be used when streaming is not supported
var streamingError = new gutil.PluginError(
  'gulp-collection',
  'Streaming not supported'
);

module.exports = function (options) {
  /* jshint validthis: true */
  // This is for the 'this in bufferContents and endStream'

  // get default options
  options = defaults(options, {
    dataKey: 'data',
    collectionKey: 'collection',
    sortBy: 'date',
    order: 'desc',
    mainPath: '[collection].html',
    pagePath: '[collection]/[page].html',
    perPage: 10,
    data: function (file, data) { return {}; },
    end: function () {},
    collections: {}
  });

  var collections = {};
  var files = [];

  // option
  // ------
  function option(name, optionName) {
    var globalValue = options[optionName];
    var collOptions = options.collections[name];
    var collValue   = collOptions ? collOptions[optionName] : null;
    return collValue || globalValue;
  }

  // newFile
  // -------
  function newFile(path, data, getData) {
    var file = new File({ path: path });
    data.path = path;
    getData(file, data);
    return file;
  }

  // bufferContent
  // -------------
  //
  // This is what is called every file that comes through the stream.
  function bufferContents(file) {
    // doesn't support streaming
    if (file.isStream()) { return this.emit('error', streamingError); }

    var fileData       = file[options.dataKey];
    var fileCollection = fileData ? fileData[options.collectionKey] : [];
    if (fileCollection) {
      // Separate the collections into the collections object
      arrayify(fileCollection).map(function (collectionName) {
        collections[collectionName] = collections[collectionName] || [];
        collections[collectionName].push(fileData);
      });
    }
    files.push(file);
  }

  // endStream
  // ---------
  //
  // This is what is called after all of the files in the stream have gone
  // through buffferContent
  function endStream() {
    var self = this;
    var collectionData = { main: {} };
    // Loop through the collections and create new paginated files
    Object.keys(collections).map(function (name) {
      var collection = collections[name];
      // sort the collection by whatever in asc or desc order
      collection.sort(sortByType(
        option(name, 'order'),
        option(name, 'sortBy')
      ));
      // chunk the collection into pages with the given length per page
      var pages = chunkArray(collection, option(name, 'perPage'));
      // loop through the pages and actually emit the new pages
      pages.map(function (page, index) {
        // this modifies the data and file object
        var getData  = option(name, 'data');
        // this is the path to the file
        var pagePath = option(name, 'pagePath')
          .replace(pageReplace, index + 1)
          .replace(collectionReplace, name);
        // this is the data that gets passed
        var data = {
          name: name,
          collection: collection,
          pages: pages,
          page: page,
          index: index
        };
        // emit the new file
        files.push(newFile(pagePath, data, getData));
        // if it's the first page, create the main page with no page
        // numbering
        if (index === 0) {
          var mainPath = option(name, 'mainPath')
            .replace(collectionReplace, name);
          var mainFile = newFile(mainPath, data, getData);
          files.push(mainFile);
          collectionData.main[name] = mainFile.data;
        }
      });
    });
    collectionData.items = collections;
    options.end(collectionData);
    // files.map(function (file) {
    //   self.emit('data', file);
    // });
    files.map(this.push);
    this.emit('end');
  }

  return through(bufferContents, endStream);

};
