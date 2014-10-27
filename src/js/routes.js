/** @jsx React.DOM */
'use strict'

var Router        = require('react-router');
var Route         = Router.Route;
var Routes        = Router.Routes;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;
var Link          = Router.Link;

var App           = require('./app');
var Home          = require('./home');

module.exports = (
  <Routes location="history">
    <Route name="app" path="/" handler={App}>
      <DefaultRoute handler={Home} />
    </Route>
  </Routes>
);
