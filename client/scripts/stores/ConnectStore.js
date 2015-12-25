var Dispatcher = require('../dispatcher/index.js');
var EventEmitter = require('events').EventEmitter;
var merge = require('merge');
var Api = require('../api/index.js');

var state = {};

function createSession(url) {
  Api.get(url, function(err, data) {
    state.session = JSON.parse(data.response);
    ConnectStore.emitChange();    
  });
}

var ConnectStore = merge(EventEmitter.prototype, {

  generatedSession: function() {
    return state.session;
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

Dispatcher.register(function(action) {
console.log("dispatcher called in ConnectStore", action);
  var type = action.type;
  if (type === 'create') {
    return createSession('/create');
  }
  return false;
});

module.exports = ConnectStore;
