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
  handleExit: function() {
    window.location.href = (window.location.href.indexOf('localhost') > -1) ? 'http://localhost:3000' : 'https://broadcast-it.herokuapp.com';
  },
  render: function() {
    return (
      <div>
        <Navbar/>
        <div styles={styles.exit} id='exit'>
          <div styles={styles.constainer}>
            <p styles={styles.exitCopy}>BROADCAST ENDED</p>
            <div styles={styles.exitBtn} onClick={this.handleExit}>EXIT</div>
          </div>
        </div>
        <div id='layoutContainer'>
         <div id="pubContainer"></div>
        </div>
      </div>
    )
  },
});

var styles = StyleSheet.create({
  exit: {
    position: 'fixed',
    top: 75,
    left: 0,
    margin: 'auto',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    color: 'white',
    zIndex: 3,
    display: 'none'
  },
  constainer: {
    position: 'absolute',
    height: '200px',
    width: '300px',
    left: 0,
    right: 0,
    top: 0,
    bottom: '250px',
    margin: 'auto',
    backgroundColor: 'black',
    textAlign: 'center'
  },
  exitCopy: {
    position: 'relative',
    fontFamily: 'Roboto-Regular',
    color: 'white',
    fontSize: 32,
    marginBottom: '10px'
  },
  exitBtn: {
    position: 'relative',
    fontFamily: 'Roboto-Regular',
    margin: 'auto',
    marginTop: 0,    
    color: '#848AFF',
    width: '200px',
    height: '30px',
    fontSize: '12px',
    fontWeight: 400,
    border: '1px solid rgba(225, 225, 225, .6)',
    backgroundColor: 'transparent',
    paddingTop: '5px',
    cursor: 'pointer'
  }
});

module.exports = Session;
