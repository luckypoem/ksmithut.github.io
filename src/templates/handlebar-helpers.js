'use strict';

var Handlebars = require('handlebars');

Handlebars.registerHelper('debug', function (elem) {
  console.log(elem);
});

Handlebars.registerHelper('cleanUrl', function (url) {
  if (!url) { return url; }
  if (url.charAt(0) !== '/') { url = '/' + url; }
  return url.replace('/index.html', '/');
});

Handlebars.registerHelper('same', function (a, b) {
  return a === b;
});
