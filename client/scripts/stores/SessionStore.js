var Dispatcher = require('../dispatcher/index.js');
var EventEmitter = require('events').EventEmitter;
var merge = require('merge');

function record(url, opts) {
  console.log('record');
}

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
  console.log("dispatcher called in SessionStore", action);  
  var type = action.type;
  if (type === 'record') {
    return record('/record');
  }
  return false;
});

module.exports = SessionStore;
