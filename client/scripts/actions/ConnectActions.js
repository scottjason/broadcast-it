var dispatcher = require('../dispatcher/index.js');

var ConnectActions = {
  createBroadcast: function(type, opts) {
    dispatcher.dispatch({
      type: type,
      opts: opts
    });
  },
  joinBroadcast: function(type, opts) {
    dispatcher.dispatch({
      type: type,
      opts: opts
    });
  }
};

module.exports = ConnectActions;