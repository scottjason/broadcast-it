var Dispatcher = require('../dispatcher/index.js');
var EventEmitter = require('events').EventEmitter;
var merge = require('merge');

var state = {};

function record(url, opts) {
  console.log('record');
}

function setSession(session) {
  state.session = session;
}

var SessionStore = merge(EventEmitter.prototype, {

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
  if (type === 'setSession') {
    return setSession(action.opts);
  } else if (type === 'record') {
    return record('/record');
  }
  return false;
});

module.exports = SessionStore;
