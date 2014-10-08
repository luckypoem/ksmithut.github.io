'use strict';

var fs   = require('fs');
var path = require('path');

module.exports = function (dir, ext) {
  var files = {};
  fs.readdirSync(dir).map(function (file) {
    var extension = path.extname(file);
    if (ext && extension !== ext) { return; }
    var fileContents = fs.readFileSync(path.join(dir, file));
    var name = path.basename(file, extension);
    files[name] = fileContents;
  });
  return files;
};
