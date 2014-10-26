/** @jsx React.DOM */
'use strict';

var React = require('react');

var View = React.createClass({
  propTypes: {
    html5: React.PropTypes.bool
  },
  getDefaultProps: function () {
    return {
      html5: false,
      base: '/'
    };
  },
  getInitialState: function () {
    return {
      path: '/'
    };
  },
  // componentWillMount: function () {},
  // componentDidMount: function () {},
  // componentWillReceiveProps: function () {},
  // shouldComponentUpdate: function () {},
  // componentWillUpdate: function () {},
  // componentDidUpdate: function () {},
  // componentWillUnmount: function () {},
  render: function () {
    return (
      <div className='myClass'></div>
    );
  }
});

module.exports = View;
