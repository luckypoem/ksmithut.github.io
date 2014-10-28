/** @jsx React.DOM */
'use strict';

var React         = require('react');
var Router        = require('react-router');
var mkdirp        = require('mkdirp');
var routes        = require('../src/js/routes');
var fs            = require('fs');

function render(path, filepath, cb) {
  return Router.renderRoutesToString(routes, path, function (err, e2, content) {
    if (err) { return cb(e); }
    var data = {};
    var destPath = require('path').resolve(__dirname, '../../dist', filepath);
    var destDir  = require('path').dirname(destPath);
    mkdirp(destDir, {mode: '0755'}, function (err, made) {
      if (err) { return cb(err); }
      fs.writeFile(destPath, template(data, content), cb);
    });
  });
};

function template(data, content) {
  return ['<!DOCTYPE html>',
    '<html>',
      '<head>',
        '<base href="/">',
        '<meta charset="utf-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        '<title>' + data.title + '</title>',
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
