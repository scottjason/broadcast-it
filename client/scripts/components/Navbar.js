'use strict';

var React = window.React = require('react');
var StyleSheet = require('react-style');
var NavbarActions = require('../actions/NavbarActions.js');
var NavbarStore = require('../stores/NavbarStore.js');
var SessionStore = require('../stores/SessionStore.js');

var Navbar = React.createClass({
  getInitialState: function() {
    return { session: SessionStore.getSession(), shortUrl: null }
  },
  stateHasChanged: function() {
    NavbarStore.removeChangeListener(this.stateHasChanged);
    var shortUrl = NavbarStore.getShortUrl();
    this.setState({ shortUrl: shortUrl });
  },
  generateUrl: function() {
    if (!this.state.shortUrl) {
      NavbarStore.addChangeListener(this.stateHasChanged);
      NavbarActions.generateShortUrl('shortUrl', { sessionId: this.state.session.sessionId } );
    }
    return this.state.shortUrl;
  },
  shareWithUrl: function() {
    NavbarActions.toggle('toggle', {});
  },
  shareToFacebook: function() {
    FB.ui({
      method: 'feed',
      link: 'https://broadcast-it-api.herokuapp.com/' + this.state.session.sessionId,
      caption: 'Join Live Stream',
    }, function(response) {
      console.log('response', response);
    });
  },
  render: function() {
    return (
      <div styles={styles.navbar}>
          <div styles={styles.cross} id='cross' onClick={this.shareWithUrl}>X</div>
          <div styles={styles.slider} id='slider'>
            <p styles={styles.url} id='shortUrl'>{this.generateUrl()}</p>
          </div>
        <p styles={styles.logo}>broadcast me</p>
        <p styles={styles.live}>LIVE STREAM</p>
        <p styles={styles.endBroadcast} id='endBroadcast'>END BROADCAST</p>        
        <p styles={styles.shareWithUrl} is='shareWithUrl' onClick={this.shareWithUrl}>SHARE WITH URL</p>
        <p styles={styles.shareToFacebook} id='shareToFacebook' onClick={this.shareToFacebook}>SHARE TO FACEBOOK</p>        
      </div>
    )
  },
});

var styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 65,
    backgroundColor: 'black'
  },
  logo: {
    position: 'relative',
    display: 'inline-block',
    float: 'left',
    fontFamily: 'poiret_oneregular',
    fontSize: 36,
    color: 'rgba(225, 225, 225, .9)',
    fontWeight: 300,
    bottom: 28,
    marginLeft: 20,
    marginRight: 10
  },
  live: {
    position: 'relative',
    display: 'inline-block',
    color: '#848AFF',
    fontSize: 12,
    fontWeight: 400,
    top: 14
  },
  shareToFacebook: {
    position: 'relative',
    display: 'inline-block',
    float: 'right',
    marginRight: 20,
    color: '#848AFF',
    fontSize: 15,
    fontWeight: 400,
    top: 12,
    cursor: 'pointer'
  },
  shareWithUrl: {
    position: 'relative',
    display: 'inline-block',
    float: 'right',
    marginRight: 20,
    color: '#848AFF',
    fontSize: 15,
    fontWeight: 400,
    top: 12,
    cursor: 'pointer'
  },
  endBroadcast: {
    position: 'relative',
    display: 'inline-block',
    float: 'right',
    marginRight: 20,
    color: '#848AFF',
    fontSize: 15,
    fontWeight: 400,
    top: 12,
    marginRight: 20,
    cursor: 'pointer'
  },
  cross: {
    position: 'absolute',
    right: '180px',
    top: 24,
    opacity: 0,
    fontWeight: 300,
    cursor: 'pointer',
    zIndex: 2
  },
  slider: {
    position: 'fixed',
    top: 0,
    right: '-400px',
    width: '400px',
    height: '65px',
    backgroundColor: 'black',
    zIndex: 1
  },
  url: {
    position: 'relative',
    color: '#848AFF',
    top: 11,
    float: 'right',
    fontSize: 14,
    fontWeight: 400,
    zIndex: 2,
    marginRight: 30
  }
});

module.exports = Navbar;
