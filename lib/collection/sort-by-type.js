'use strict';

var types = {
  date: {
    is: function (obj) {
      return obj instanceof Date && !isNaN(obj.valueOf());
    },
    sort: function (order, a, b) {
      if (order === 'desc') { return b - a; }
      return a - b;
    }
  },
  string: {
    is: function (obj) {
      return typeof obj === 'string' || obj instanceof String;
    },
    sort: function (order, a, b) {
      return order === 'desc' ? b.localCompare(a) : a.localCompare(b);
    }
  },
  number: {
    is: function (obj) {
      return typeof obj === 'number';
    },
    sort: function (order, a, b) {
      return order === 'desc' ? b - a : a - b;
    }
  },
  undefined: {
    is: function (obj) { return false; },
    sort: function (order, a, b) {
      return 0;
    }
  }
};

function getType(obj) {
  var theType = 'undefined';
  Object.keys(types).some(function (type) {
    var isType = types[type].is;
    if (isType(obj)) {
      theType = type;
      return true;
    }
  });
  return theType;
}

function sortByType(order, key) {
  return function (a, b) {
    var type = getType(a[key]);
    return types[type].sort(order, a[key], b[key]);
  };
}

module.exports = sortByType;
