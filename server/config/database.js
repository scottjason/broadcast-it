/**
 * Database Configuration
 */

'use strict';

var config = require('./');
var mongoose = require('mongoose');

mongoose.connection.on('connected', connected);
mongoose.connection.on('disconnected', connect);
mongoose.connection.on('error', console.log);
mongoose.set('debug', true);

function connect() {
  mongoose.connect(config.db.uri);
};

function connected() {
  console.log("Database connected at", config.db.uri);
};

module.exports = {
  connect: connect
};
