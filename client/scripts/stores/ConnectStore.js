var Dispatcher = require('../dispatcher/index.js');
var EventEmitter = require('events').EventEmitter;
var merge = require('merge');
var Api = require('../api/index.js');

var state = {};

function createBroadcast(url) {
  Api.get(url, function(err, data) {
    state.brodast = data.response;
    ConnectStore.emitChange();      
  });
}

var ConnectStore = merge(EventEmitter.prototype, {

  getBroadcast: function() {
    return state.brodast;
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
  var type = payload.type;
  if (type === 'create') {
    createBroadcast('/create');
  }
  return true;
});

module.exports = ConnectStore;
