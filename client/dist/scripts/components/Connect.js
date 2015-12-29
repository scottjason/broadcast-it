'use strict';

var Reflux = require('reflux');
var StyleSheet = require('react-style');
var ConnectStore = require('../stores/ConnectStore.js');
var Navigation = require('react-router').Navigation;
var actions = require('../actions/index.js');

var Connect = React.createClass({
  mixins: [Navigation, Reflux.ListenerMixin],
  getInitialState: function() {
    return { isMobile : (document.documentElement.clientWidth <= 667) };
  },
  componentDidMount: function() {
    this.listenTo(ConnectStore, this.onSessionCreated);
    window.addEventListener('resize', this.resizeEvent);
  },
  resizeEvent: function(event) {
    (document.documentElement.clientWidth <= 667) ? this.setState({ isMobile: true }) : this.setState({ isMobile: false });
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
  isMobile: function() {
    return document.documentElement.clientWidth <= 667;
  },
  render: function() {
    return (
      <div styles={styles.container}>
        <p styles={this.state.isMobile ? styles.mobileLogo : styles.logo}>broadcast it</p>        
        <div styles={this.state.isMobile ? styles.mobileUnderline : styles.underline}></div>   
        <div styles={this.state.isMobile ? styles.mobileOption : styles.option} onClick={this.createSession} >create</div>                   
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
  mobileLogo: {
    position: 'relative',
    fontFamily: 'poiret_oneregular',
    textAlign: 'center',
    fontSize: 48,
    color: 'rgba(225, 225, 225, .6)',
    fontWeight: 300,
    marginBottom: 0,
    marginTop: 83
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
  mobileOption: {
    position: 'relative',
    display: 'inline-block',
    outline: 0,
    border: 'transparent',
    backgroundColor: 'transparent',
    color: '#848AFF',
    float: 'right',
    right: 61,
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
    width: 400,
    height: 1,
    backgroundColor: 'rgba(225, 225, 225, .2)',
  },
  mobileUnderline: {
    position: 'absolute',
    top: 137,
    left: 0,
    right: 0,
    margin: 'auto',
    width: 280,
    height: 1,
    backgroundColor: 'rgba(225, 225, 225, .2)',
    transition: .4
  }  
});


module.exports = Connect;
