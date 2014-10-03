'use strict';

module.exports = function chunk(array, chunkSize) {
  return [].concat.apply([],
    array.map(function (elem, i) {
      return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
    })
  );
};
