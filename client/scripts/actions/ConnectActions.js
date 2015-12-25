var dispatcher = require('../dispatcher/index.js');

var ConnectActions = {
  create: function(type, opts) {
    dispatcher.dispatch({
      type: type,
      opts: opts
    });
  },
  join: function(type, opts) {
    dispatcher.dispatch({
      type: type,
      opts: opts
    });
  },
  set: function(type, opts) {
    dispatcher.dispatch({
      type: type,
      opts: opts
    });
  }
};

module.exports = ConnectActions;
