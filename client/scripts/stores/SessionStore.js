var Reflux = require('reflux');
var Api = require('../api/index.js');
var actions = require('../actions');

module.exports = Reflux.createStore({
  state: {},
  init: function() {
    this.listenTo(actions.startBroadcast, this.startBroadcast);
  },
  startBroadcast: function(otSession) {
    var session = OT.initSession(otSession.key, otSession.sessionId);
    this.registerEvents(session);
    this.connect(session, otSession.token);
  },
  registerEvents: function(session) {
    session.on({
      connectionCreated: function(event) {
        actions.addViewer();
      },
      connectionDestroyed: function(event) {
        actions.removeViewer();        
      },
      sessionDisconnected: function sessionDisconnectHandler(event) {
        console.log('Disconnected from the session: ', event.reason);
      }
    });
  },
  connect: function(session, token) {
    session.connect(token, function(error) {
      if (error) {
        console.log(error.message);
      } else {
        var opts = {
          Animator: {
            duration: 500,
            easing: 'swing'
          },
          bigFixedRatio: false
        };
        var layoutContainer = document.getElementById('layoutContainer');
        var layout = initLayoutContainer(layoutContainer, opts).layout;
        session.publish("pubContainer");
        layout();
        var resizeTimeout;
        window.onresize = function() {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(function() {
            layout();
          }, 20);
        };
      }
    });
  }
});
