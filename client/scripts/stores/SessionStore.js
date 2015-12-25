var Dispatcher = require('../dispatcher/index.js');
var EventEmitter = require('events').EventEmitter;
var merge = require('merge');
var Api = require('../api/index.js');

var state = {};

var SessionStore = merge(EventEmitter.prototype, {

  emitChange: function() {
    this.emit('change');
  },
  addChangeListener: function(cb) {
    this.on('change', cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener('change', cb);
  }
});

Dispatcher.register(function(action) {
  return true;
});

module.exports = SessionStore;
