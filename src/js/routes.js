/** @jsx React.DOM */
'use strict';

var Router        = require('react-router');
var Route         = Router.Route;
var Routes        = Router.Routes;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;
var Link          = Router.Link;

var App           = require('./app');
var Home          = require('./pages/home');
var Contact       = require('./pages/contact');

module.exports = (
  <Routes location="history">
    <Route path="/" handler={App}>
      <Route path="/" name="home" handler={Home} />
      <Route path="/contact/" name="contact" handler={Contact} />
    </Route>
  </Routes>
);
