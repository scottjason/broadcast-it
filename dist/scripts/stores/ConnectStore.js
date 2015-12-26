var Reflux = require('reflux');
var Api = require('../api/index.js');
var actions = require('../actions');

module.exports = Reflux.createStore({
  state: {},
  init: function() {
    if (window.sessionId) {
      return console.log("server redirect");
    }
    this.listenTo(actions.createSession, this.createSession);
    this.listenTo(actions.getSession, this.getSession);
  },
  createSession: function(url) {
    Api.get(url, function(err, data) {
      var session = JSON.parse(data.response);
      this.setSession(session);
      this.trigger(session);
    }.bind(this));
  },
  setSession: function(session) {
    this.state.session = session;
  },
  getSession: function() {
    this.trigger(this.state.session);
  }
});
