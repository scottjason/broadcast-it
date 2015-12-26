'use strict';

var React = window.React = require('react');
var Reflux = require('reflux');
var StyleSheet = require('react-style');
var Navigation = require('react-router').Navigation;
var Navbar = require('./Navbar.js');
var ConnectStore = require('../stores/ConnectStore.js');
var SessionStore = require('../stores/SessionStore.js');
var actions = require('../actions/');

var Session = React.createClass({
  mixins: [Navigation, Reflux.ListenerMixin],  
  getInitialState: function() {
    return { session: actions.getSession() }
  },
  onStateChange: function(func, data) {
    this[func](data);
  },
  componentDidMount: function() {
    this.listenTo(ConnectStore, this.onSessionReceived);
    this.listenTo(SessionStore, this.onStateChange);
  },
  onSessionReceived: function(session) {
    this.setState({ session: session });
    actions.startBroadcast(session);
  },
  onBroadcastEnded: function() {
    actions.showExitScene();
  },
  render: function() {
    return (
      <div>
        <Navbar/>
        <div styles={styles.exitOverlay} id='exitOverlay'>
        </div>
        <div id='layoutContainer'>
         <div id="pubContainer"></div>
        </div>
      </div>
    )
  },
});


var styles = StyleSheet.create({
  exitOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    margin: 'auto',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    color: 'white',
    zIndex: 3,
    display: 'none'
  }
});

module.exports = Session;
