'use strict';

var fs   = require('fs');
var path = require('path');
var templatesPath = path.resolve(__dirname, '../src/templates');

var templates = {};

fs.readdirSync(templatesPath).map(function (templateFile) {
  var extension = path.extname(templateFile);
  if (extension !== '.jade') { return; }
  var fileContents = fs.readFileSync(path.join(templatesPath, templateFile));
  var templateName = path.basename(templateFile, extension);
  templates[templateName] = fileContents;
});

module.exports = templates;
