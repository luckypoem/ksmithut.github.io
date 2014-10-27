/** @jsx React.DOM */
'use strict';

var React  = require('react');
var Header = require('./components/header');
var Footer = require('./components/footer');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Header />
        <this.props.activeRouteHandler />
        <Footer />
      </div>
    );
  }
});

module.exports = App;
