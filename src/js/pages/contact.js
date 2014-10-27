/** @jsx React.DOM */
'use strict';

var React         = require('react');
var DocumentTitle = require('react-document-title');

var Home = React.createClass({
  render: function () {
    return (
      <DocumentTitle title="Contact">
        <h1>Contact</h1>
      </DocumentTitle>
    );
  }
});

module.exports = Home;
