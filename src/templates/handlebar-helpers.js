'use strict';

module.exports = {
  debug: function (elem) {
    console.log(elem);
  },
  cleanUrl: function (url) {
    if (!url) { return url; }
    if (url.charAt(0) !== '/') { url = '/' + url; }
    if (url.charAt(url.length - 1) !== '/') { url += '/'; }
    return url.replace('/index.html', '/');
  },
  same: function (a, b) {
    return a === b;
  }
};
