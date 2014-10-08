'use strict';

var path = require('path');
var templatesPath = path.resolve(__dirname, '../src/templates/inc');

module.exports = require('./get-files')(templatesPath, '.jade');
