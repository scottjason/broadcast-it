'use strict';

var React = window.React = require('react');
var Reflux = require('reflux');
var Navigation = require('react-router').Navigation;
var actions = require('../actions/');
var SessionStore = require('../stores/SessionStore.js');
var ConnectStore = require('../stores/ConnectStore.js');
var Navbar = require('./Navbar.js');

var Session = React.createClass({
  mixins: [Navigation, Reflux.ListenerMixin],  
  getInitialState: function() {
    return { session: actions.getSession() }
  },  
  componentDidMount: function() {
    this.listenTo(ConnectStore, this.onSessionReceived);
  },
  onSessionReceived: function(session) {
    console.log("session received in session", session);
    this.setState({ session: session });
    this.startBroadcast();
  },
  startBroadcast: function() {
    var session = OT.initSession(this.state.session.key, this.state.session.sessionId);
    this.registerEvents(session);
    session.connect(this.state.session.token, function(error) {
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
        session.publish("publisherContainer");
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
  },  
  registerEvents: function(session) {
    session.on({
      connectionCreated: function(event) {
        actions.addViewer();
        console.log('connection created');        
      },
      connectionDestroyed: function(event) {
        actions.removeViewer();        
        console.log('connection destroyed');                
      },
      sessionDisconnected: function sessionDisconnectHandler(event) {
        console.log('Disconnected from the session: ', event.reason);
      }
    });
  },
  render: function() {
    return (
      <div>
        <Navbar/>
        <div id='layoutContainer'>
         <div id="publisherContainer"></div>
        </div>
      </div>
    )
  },
});

module.exports = Session;
