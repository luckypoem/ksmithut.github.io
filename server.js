'use strict';

var path    = require('path');
var express = require('express');
var app     = express();

var PUBLIC_DIR = path.join(__dirname, 'public');
var CACHE_AGE  = 0;

app.disable('x-powered-by');

app.use(require('compression')());
app.use(require('body-parser')());
app.use(require('method-override')());
app.use(require('cookie-parser')());
app.use(require('express-session')({
  name: 'sid',
  secret: '12f0932uewd0fas8uqo23qwepf8u2h2h3erbfwq2px9huh923',
  store: true
}));
app.use(require('csurf')());
app.use(function (req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
});
