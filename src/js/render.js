/** @jsx React.DOM */
'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');
var mkdirp        = require('mkdirp');
var routes        = require('./routes');
var fs            = require('fs');

function render(path, filepath, cb) {
  return Router.renderRoutesToString(routes, path, function (err, e2, content) {
    if (err) { return cb(e); }
    var destPath = require('path').resolve(__dirname, '../../dist', filepath);
    var destDir  = require('path').dirname(destPath);
    var title = DocumentTitle.rewind();
    mkdirp(destDir, {mode: '0755'}, function (err, made) {
      if (err) { return cb(err); }
      fs.writeFile(destPath, template(title, content), cb);
    });
  });
};

function template(title, content) {
  return ['<!DOCTYPE html>',
    '<html>',
      '<head>',
        '<base href="/">',
        '<meta charset="utf-8">',
        '<title>' + title + '</title>',
      '</head>',
      '<body>',
        '<div id="app">' + content + '</div>',
        '<script src="/js/app.js"></script>',
      '</body>',
    '</html>'].join('');
};

function renderRoutes(routes, cb) {
  if (!routes[0]) { return cb; }
  render(routes[0].url, routes[0].file, function (err) {
    if (err) { return cb(err); }
    renderRoutes(routes.slice(1), cb);
  });
};

module.exports = function (routes, cb) {
  var routesArray = Object.keys(routes).map(function (route) {
    return {
      url: route,
      file: routes[route]
    };
  });
  renderRoutes(routesArray, cb);
};
