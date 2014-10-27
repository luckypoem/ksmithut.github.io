/** @jsx React.DOM */
'use strict';

var React = require('react');
var Link  = require('react-router').Link;

var Navigation = React.createClass({
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
      <nav>
        <ul>
          <li><Link to="home">Home</Link></li>
          <li><Link to="contact">Contact</Link></li>
        </ul>
      </nav>
    );
  }
});

module.exports = Navigation;
