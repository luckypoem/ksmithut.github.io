'use strict';

module.exports = function (obj) {
  return Array.isArray(obj) ? obj : [obj];
};
