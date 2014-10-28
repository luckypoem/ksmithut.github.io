/** @jsx React.DOM */
'use strict';

ExecutionEnvironment = require('react/lib/ExecutionEnvironment');

var titles       = {};
var descriptions = {};

var HeadMixin = function (data) {
  return {
    componentWillMount: function () {
      if (data.title) {

      }
    }
  };
};

HeadMixin.title = function (url) {
  return titles[url];
};

HeadMixin.description = function (url) {
  return descriptions[url];
};

module.exports = HeadMixin;
