var Dispatcher = require('../dispatcher/index.js');
var EventEmitter = require('events').EventEmitter;
var merge = require('merge');

var state = {};

function setSession(session) {
  console.log('app is setting session', session);
  state.session = session;
}

var ConnectStore = merge(EventEmitter.prototype, {

  getSession: function() {
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
  var type = action.type;
  if (type === 'session') {
    return setSession(action.data);
  }
  return false;
});

module.exports = ConnectStore;
