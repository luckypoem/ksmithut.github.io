'use strict';

module.exports = function (titles) {
  titles = titles || {};
  return function (files, metalsmith, done) {
    Object.keys(files).forEach(function (filepath) {
      var file = files[filepath];
      if (!file.paginate || !titles[file.paginate.name]) { return; }
      file.title = titles[file.paginate.name];
    });
    done();
  };
};
