/** @jsx React.DOM */
'use strict';

var React = require('react');

var Footer = React.createClass({
  // mixins: [],
  // propTypes: {},
  // statics: {},
  // getDefaultProps: function () { return {}; },
  // getInitialState: function () { return {}; },
  // componentWillMount: function () {},
  // componentDidMount: function () {},
  // componentWillReceiveProps: function () {},
  // shouldComponentUpdate: function () {},
  // componentWillUpdate: function () {},
  // componentDidUpdate: function () {},
  // componentWillUnmount: function () {},
  render: function () {
    return (
      <footer>
        {'\u00a9 Keith Smith 2014'}
      </footer>
    );
  }
});

module.exports = Footer;