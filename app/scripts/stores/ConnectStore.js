var Dispatcher = require('../dispatcher/index.js');
var EventEmitter = require('events').EventEmitter;
var merge = require('merge');

var state = {};

function generateBroadcastOpts(data) {
  state = data.brodcast;
  ConnectStore.emitChange();  
}

var ConnectStore = merge(EventEmitter.prototype, {

  getState: function() {
    return state;
  },
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

Dispatcher.register(function(payload) {
  var action = payload.action;  
  generateBroadcastOpts(action.data);
  return true;
});

module.exports = ConnectStore;