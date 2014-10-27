/** @jsx React.DOM */
'use strict';

var React      = require('react');
var Router     = require('react-router');
var mkdirp     = require('mkdirp');
var routes     = require('./routes');
var TitleMixin = require('./mixins/title');
var fs         = require('fs');

function render(path, filepath, cb) {
  console.log('hello');
  return Router.renderRoutesToString(routes, path, function (err, e2, content) {
    if (err) { return cb(e); }
    var destPath = require('path').resolve(__dirname, '../../dist', filepath);
    var destDir  = require('path').dirname(destPath);
    var title = TitleMixin.currentTitle;
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

render('/', 'index.html', function (err) {
  if (err) { console.error(err.stack); }
  render('/contact/', 'contact/index.html', function (err) {
    if (err) { console.error(err.stack); }
  });
});
