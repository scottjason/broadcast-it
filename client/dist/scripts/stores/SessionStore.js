var Reflux = require('reflux');
var Api = require('../api/index.js');
var actions = require('../actions');

module.exports = Reflux.createStore({
  state: {},
  init: function() {
    this.listenTo(actions.startBroadcast, this.startBroadcast);
    this.listenTo(actions.endBroadcast, this.endBroadcast);
    this.listenTo(actions.showExitScene, this.showExitScene);
  },
  startBroadcast: function(otSession) {
    var session = OT.initSession(otSession.key, otSession.sessionId);
    this.state.session = session;
    this.registerEvents();
    this.connect(otSession.token);
  },
  endBroadcast: function() {
    this.state.session.disconnect();
    actions.showExitScene();
  },
  registerEvents: function() {
    this.state.session.on({
      connectionCreated: function(event) {
        actions.addViewer();
      },
      connectionDestroyed: function(event) {
        actions.removeViewer();        
      }
    });
  },
  connect: function(token) {
    this.state.session.connect(token, function(error) {
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
        this.state.session.publish("pubContainer");
        layout();
        var resizeTimeout;
        window.onresize = function() {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(function() {
            layout();
          }, 20);
        };
      }
    }.bind(this));
  }, 
  showExitScene: function() {
    var exit = document.getElementById('exit');
    $(exit).velocity('fadeIn', { duration: 100 })
  }  
});
