var Dispatcher = require('../dispatcher/index.js');
var EventEmitter = require('events').EventEmitter;
var merge = require('merge');

var state = {};
state.viewCount = 0;

function setSession(session) {
  state.session = session;
}

function addViewer(count) {
  state.viewCount += (count -1);
  SessionStore.emitChange();
}

function removeViewer(opts) {
  state.viewCount -= count;
  SessionStore.emitChange();  
}

function sessionEnded() {
  state.isSessionEnded = true;
  SessionStore.emitChange();    
}

var SessionStore = merge(EventEmitter.prototype, {

  getSession: function() {
    return state.session;
  },
  getViewCount: function() {
    return state.viewCount;
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
  } else if (type === 'addViewer') {
    return addViewer(action.opts);
  } else if (type === 'removeViewer') {
    return removeViewer(action.opts);
  } else if (type === 'sessionEnded') {
    return sessionEnded();
  }
  return false;
});


module.exports = SessionStore;
