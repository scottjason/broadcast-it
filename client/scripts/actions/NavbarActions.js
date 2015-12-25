var dispatcher = require('../dispatcher/index.js');

var NavbarActions = {
  toggle: function(type, opts) {
    dispatcher.dispatch({
      type: type,
      opts: opts
    });
  },  
  generateShortUrl: function(type, opts) {
    dispatcher.dispatch({
      type: type,
      opts: opts
    });
  },
};

module.exports = NavbarActions;
