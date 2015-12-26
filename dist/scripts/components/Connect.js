'use strict';

var React = window.React = require('react');
var Reflux = require('reflux');
var StyleSheet = require('react-style');
var ConnectStore = require('../stores/ConnectStore.js');
var Navigation = require('react-router').Navigation;
var actions = require('../actions/index.js');

var Connect = React.createClass({
  mixins: [Navigation, Reflux.ListenerMixin],
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    this.listenTo(ConnectStore, this.onSessionCreated);
  },
  createSession: function(event) {
    event.preventDefault();
    actions.createSession('/create');
  },
  onSessionCreated: function(session) {
    this.stopListeningToAll();
    var path = '/publisher/' + session.sessionId;    
    this.props.history.pushState(null, path);
  },
  render: function() {
    return (
      <div styles={styles.container}>
        <p styles={styles.logo}>broadcast it</p>        
        <div styles={styles.underline}></div>   
        <div styles={styles.option} onClick={this.createSession} >create</div>                   
      </div>
    )
  },
});

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 60,
    left: 0,
    right: 0,
    width: 400,
    height: 300,
    margin: 'auto',
    textAlign: 'center'
  },
  logo: {
    position: 'relative',
    fontFamily: 'poiret_oneregular',
    textAlign: 'center',
    fontSize: 64,
    color: 'rgba(225, 225, 225, .6)',
    fontWeight: 300,
    marginBottom: 0
  },
  option: {
    position: 'relative',
    display: 'inline-block',
    outline: 0,
    border: 'transparent',
    backgroundColor: 'transparent',
    color: '#848AFF',
    float: 'right',
    right: 20,
    fontSize: 16,
    fontWeight: 300,
    cursor: 'pointer'
  },
  underline: {
    position: 'absolute',
    top: 137,
    left: 0,
    right: 0,
    margin: 'auto',
    width: 370,
    height: 1,
    backgroundColor: 'rgba(225, 225, 225, .2)'
  }
});

module.exports = Connect;
