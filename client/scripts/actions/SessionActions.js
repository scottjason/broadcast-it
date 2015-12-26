var dispatcher = require('../dispatcher/index.js');

var SessionActions = {
  record: function(type, opts) {
    dispatcher.dispatch({
      type: type,
      opts: opts
    });
  },
  stop: function(type, opts) {
    dispatcher.dispatch({
      type: type,
      opts: opts
    });
  },
  download: function(type, opts) {
    dispatcher.dispatch({
      type: type,
      opts: opts
    });
  },
  share: function(type, opts) {
    dispatcher.dispatch({
      type: type,
      opts: opts
    });
  },
  addViewer: function(type, opts) {
    dispatcher.dispatch({
      type: type,
      opts: opts
    });
  },
  removeViewer: function(type, opts) {
    dispatcher.dispatch({
      type: type,
      opts: opts
    });
  },
  sessionEnded: function(type, opts) {
    dispatcher.dispatch({
      type: type,
      opts: opts
    });
  },
};

module.exports = SessionActions;
