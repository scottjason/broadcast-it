'use strict';

var React = window.React = require('react');
var Reflux = require('reflux');
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
  componentDidMount: function() {
    this.listenTo(ConnectStore, this.onSessionReceived);
  },
  onSessionReceived: function(session) {
    this.setState({ session: session });
    actions.startBroadcast(session);
  },
  render: function() {
    return (
      <div>
        <Navbar/>
        <div id='layoutContainer'>
         <div id="pubContainer"></div>
        </div>
      </div>
    )
  },
});

module.exports = Session;
