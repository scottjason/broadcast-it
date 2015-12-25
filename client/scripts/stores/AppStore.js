var Dispatcher = require('../dispatcher/index.js');
var EventEmitter = require('events').EventEmitter;
var merge = require('merge');

var state = {};

function setSession(data) {
  state.session = data;
  AppStore.emitChange();
}

var AppStore = merge(EventEmitter.prototype, {

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
    return setSession(action.opts);
  }
  return false;
});

module.exports = AppStore;
