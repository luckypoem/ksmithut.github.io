/** @jsx React.DOM */
'use strict'

var React = require('react');

var Link = React.createClass({
  propTypes: {
    path: React.PropTypes.string.isRequired
  },
  handleClick: function (e) {
    e.preventDefault();
  },
  render: function () {
    return (
      <a href={this.props.path} onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
});

module.exports = Link;
