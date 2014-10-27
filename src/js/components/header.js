/** @jsx React.DOM */
'use strict';

var React      = require('react');
var Link       = require('react-router').Link;
var Navigation = require('./navigation');

var Header = React.createClass({
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
      <header>
        <Link to="home">ksmithut</Link>
        <Navigation />
      </header>
    );
  }
});

module.exports = Header;
