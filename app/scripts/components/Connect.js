'use strict';

var React = window.React = require('react');
var StyleSheet = require('react-style');
var ConnectActions = require('../actions/ConnectActions.js');
var ConnectStore = require('../stores/ConnectStore.js');

var Landing = React.createClass({
  createBroadcast: function() {
    ConnectStore.addChangeListener(this.stateHasChanged);    
    ConnectActions.createBroadcast();
  },
  joinBroadcast: function() {
    ConnectStore.addChangeListener(this.stateHasChanged);    
    ConnectActions.joinBroadcast();
  }.
  stateHasChanged: function() {
    var connectOpts = ConnectStore.getConnectOpts();
    console.log("state has changed");
  },
  render: function() {
    return (
      <div styles={styles.container}>
        <p styles={styles.logo}>broadcast</p>        
        <div styles={styles.underline}></div>   
        <div styles={styles.option} onClick={this.createBroadcast} >create</div>   
        <div styles={styles.divider}></div>     
        <div styles={[styles.option, styles.firstOption]} onClick={this.joinBroadcast}>join</div>                  
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
  firstOption: {
    marginRight: 20
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
  },
  divider: {
    position: 'relative',
    display: 'inline-block',
    float: 'right',
    top: 6,
    right: 30,
    width: 1,
    height: 12,
    backgroundColor: '#848AFF',
    opacity: .4
  }
});

module.exports = Landing;
