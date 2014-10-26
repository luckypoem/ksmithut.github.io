/** @jsx React.DOM */
'use strict'

var React      = require('react');
var urlPattern = require('url-pattern');

var removeProperties = ['path', 'component'];

var Route = React.createClass({
  propTypes: {
    path: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.instanceOf(RegExp)
    ]).isRequired,
    component: React.PropTypes.component.isRequired
  },
  isMatch: function (path) {
    var pattern = urlPattern.newPattern(this.props.path);
    return pattern.match(path);
  },
  componentProps: function () {
    var props = {};
    var i;
    for (i in this.props) {
      if (this.props.hasOwnProperty(i) && removeProperties.indexOf(i) === -1) {
        props[i] = this.props[i];
      }
    }
    return props;
  },
  component: function (params) {
    var props = this.componentProps();
    if (params) { props.params = params; }
    return this.props.component(props);
  }
});

module.exports = Route;
