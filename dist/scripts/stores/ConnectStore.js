var Reflux = require('reflux');
var Api = require('../api/index.js');
var actions = require('../actions');

module.exports = Reflux.createStore({
  state: {},
  init: function() {
    if (window.isSubscriber) {
      this.getSession();
      return;
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
    if (!window.isSubscriber) {
      console.log("isPublisher");
      this.trigger(this.state.session);
    } else {
      console.log("isSubscriber");
      var session = {};
      session.isSubscriber = true;
      session.sessionId = sessionId;
      session.token = token;
      session.key = key;
      session.expiresAt = expiresAt;
      this.state.session = session;
      this.trigger(this.state.session);
    }
  }
});
