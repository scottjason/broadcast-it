'use strict';

var Reflux = require('reflux');
var StyleSheet = require('react-style');
var Navigation = require('react-router').Navigation;
var NavbarStore = require('../stores/NavbarStore.js');
var ConnectStore = require('../stores/ConnectStore.js');
var actions = require('../actions/');

var Navbar = React.createClass({
  mixins: [Navigation, Reflux.ListenerMixin],  
  getInitialState: function() {
    return { session: {}, viewCount: 0, shortUrl: '', startedAt: null, expiresAt: null, timeLeft: null, isExitMode: false };
  },
  onStateChange: function(func, data) {
    var cb = this[func];
    if (typeof cb === 'function') {
        cb(data);
    }
  },  
  componentDidMount: function(){
    this.listenTo(ConnectStore, this.onSessionReceived);    
    this.listenTo(NavbarStore, this.onStateChange);    
    this.setState({ startedAt: new Date().getTime() });
    this.setState({ expiresAt: new Date().getTime() + 180000 });
    this.timer = setInterval(this.tick, 50);
  },
  componentWillUnmount: function(){
    clearInterval(this.timer);
  },
  onSessionReceived: function(session) {
    this.setState({ session: session });
    actions.createShortUrl(session.sessionId);
  },
  tick: function(){
    var timeLeft = this.state.expiresAt - new Date().getTime();
    var minutes = Math.floor(timeLeft / 60000);
    var seconds = ((timeLeft % 60000) / 1000).toFixed();
    if (seconds.length == 1) seconds = '0' + seconds;
    if (minutes == 0 && seconds == 0) {
      this.setState({timeLeft: minutes + ':' + seconds });      
      clearInterval(this.timer)
      actions.endBroadcast()
      return;
    }
    this.setState({timeLeft: minutes + ':' + seconds });
  },
  onShortUrlCreated: function(shortUrl) {
    this.setState({ shortUrl: shortUrl });
  },
  onViewCountChanged: function(viewCount) {
    this.setState({ viewCount: viewCount });
  },  
  shareWithUrl: function(event) {
    event.preventDefault();    
    actions.toggleUrl();
  },
  shareToFacebook: function(event) {
    event.preventDefault();    
    actions.shareToFacebook(this.state.session.sessionId);
  },
  endBroadcast: function(event) {
    event.preventDefault();
    this.setState({ isExitMode: true });
    actions.endBroadcast();
  },
  onBroadcastEnded: function() {
    this.setState({ isExitMode: true });
    actions.expireSession(this.state.session.sessionId);
  },
  render: function() {
    return (
      <div styles={styles.navbar}>
        <div styles={styles.cross} id='cross' onClick={this.shareWithUrl}>X</div>
        <div styles={styles.slider} id='slider'>
          <p styles={styles.url} id='shortUrl'>{this.state.isExitMode ? '' : this.state.shortUrl}</p>
        </div>
        <p styles={styles.logo}>broadcast it</p>
        <p styles={styles.live}>LIVE STREAM</p>
        <div styles={styles.dataContainer} id='dataContainer'>
          <div styles={styles.divider}></div>
          <p styles={styles.timeLeft}>TIME LEFT</p>
          <p styles={styles.timer}>{this.state.timeLeft}</p>
          <div styles={styles.divider}></div>        
          <p styles={styles.timeLeft}>VIEW COUNT</p>
          <p styles={styles.timer}>{this.state.viewCount}</p> 
        </div>       
        <p styles={styles.endBroadcast} id='endBroadcast' onClick={this.endBroadcast}>END BROADCAST</p>        
        <p styles={styles.shareWithUrl} id='shareWithUrl' onClick={this.shareWithUrl}>SHARE WITH URL</p>
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
  dataContainer: {
    position: 'relative',
    display: 'inline-block'
  },
  divider: {
    position: 'relative',
    display: 'inline-block',
    height: '13px',
    width: '1px',
    backgroundColor: '#DEE0FF',
    marginLeft: 10,
    top: '16px'
  },
  timeLeft: {
    position: 'relative',
    display: 'inline-block',
    color: '#DEE0FF',
    fontSize: 12,
    fontWeight: 400,
    top: 14,
    marginLeft: 10
  },  
  timer: {
    position: 'relative',
    display: 'inline-block',
    color: '#848AFF',
    fontSize: 12,
    fontWeight: 400,
    top: 14,
    marginLeft: 6
  },
  shareToFacebook: {
    position: 'relative',
    display: 'inline-block',
    float: 'right',
    marginRight: 20,
    color: '#848AFF',
    fontSize: 12,
    fontWeight: 400,
    top: 14,
    cursor: 'pointer'
  },
  shareWithUrl: {
    position: 'relative',
    display: 'inline-block',
    float: 'right',
    marginRight: 20,
    color: '#848AFF',
    fontSize: 12,
    fontWeight: 400,
    top: 14,
    cursor: 'pointer'
  },
  endBroadcast: {
    position: 'relative',
    display: 'inline-block',
    float: 'right',
    marginRight: 20,
    color: '#848AFF',
    fontSize: 12,
    fontWeight: 400,
    top: 14,
    marginRight: 20,
    cursor: 'pointer'
  },
  cross: {
    position: 'absolute',
    right: '-145px',
    top: 23.5,
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
    top: 14,
    float: 'right',
    fontSize: 12,
    fontWeight: 400,
    zIndex: 2,
    marginRight: 20
  }
});

module.exports = Navbar;
