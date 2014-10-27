/** @jsx React.DOM */
'use strict'

var React = require('react');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <header>
          <span>ksmithut</span>
        </header>

        <this.props.activeRouteHandler />

        <footer>
          <span>{'\u00a9 Keith Smith 2014'}</span>
        </footer>
      </div>
    );
  }
});

module.exports = App;
