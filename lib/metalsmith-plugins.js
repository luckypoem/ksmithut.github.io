'use strict';

var m = require('load-metalsmith-plugins')();

Object.keys(m).map(function (plugin) {
  if (plugin.indexOf('-') === -1) { return; }
  var newPluginName = plugin
    .split('-')
    .map(function (word, i) {
      if (i === 0) { return word.toLowerCase(); }
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    })
    .join('');
  m[newPluginName] = m[plugin];
  delete m[plugin];
});

m.collectionsTitles = require('./plugins/collections-titles');

module.exports = m;
