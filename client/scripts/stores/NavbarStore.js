var Reflux = require('reflux');
var Api = require('../api/index.js');
var actions = require('../actions');

module.exports = Reflux.createStore({
  state: {
    viewCount: -1
  },
  init: function() {
    this.listenTo(actions.createShortUrl, this.createShortUrl);
    this.listenTo(actions.toggleUrl, this.toggleUrl);
    this.listenTo(actions.shareToFacebook, this.shareToFacebook);
    this.listenTo(actions.addViewer, this.addViewer);
    this.listenTo(actions.removeViewer, this.removeViewer);
    this.listenTo(actions.showExitScene, this.showExitScene);
  },
  createShortUrl: function(sessionId) {
    var opts = {};
    opts.url = '/shortUrl';
    opts.longUrl = 'https://broadcast-it-api.herokuapp.com/' + sessionId;
    Api.post(opts, function(err, results) {
      this.trigger('onShortUrlCreated', results.url);
    }.bind(this));
  },
  toggleUrl: function() {
    
    var shareToFacebook = document.getElementById('shareToFacebook');
    var shareWithUrl = document.getElementById('shareWithUrl');
    var endBroadcast = document.getElementById('endBroadcast');
    var slider = document.getElementById('slider');
    var cross = document.getElementById('cross');
      
    this.state.isToggled = !this.state.isToggled;
    
    if (this.state.isToggled) {
      var sequence = [
        { e: $(shareToFacebook), p: { translateX: '400px' }, o: { duration: 150 } }, 
        { e: $(shareWithUrl), p: { translateX: '400px' }, o: { duration: 150, sequenceQueue: false } },
        { e: $(endBroadcast), p: { translateX: '400px' }, o: { duration: 150, sequenceQueue: false } },
        { e: $(slider), p: { translateX: '-410px' }, o: { duration: 225, sequenceQueue: true } },        
        { e: $(cross), p: { translateX: '-298px' }, o: { duration: 225, sequenceQueue: false } },        
        { e: $(cross), p: { rotateZ: 720 }, o: { duration: 400, sequenceQueue: true } }
      ];
      
    } else {
      var sequence = [
        { e: $(cross), p: { rotateZ: -720 }, o: { duration: 400 } },
        { e: $(cross), p: { translateX: '298px' }, o: { duration: 225, sequenceQueue: true } },        
        { e: $(slider), p: { translateX: '410px' }, o: { duration: 225, sequenceQueue: false } },        
        { e: $(endBroadcast), p: { translateX: '0' }, o: { duration: 150, sequenceQueue: true } },
        { e: $(shareWithUrl), p: { translateX: '0' }, o: { duration: 150, sequenceQueue: false } },
        { e: $(shareToFacebook), p: { translateX: '0' }, o: { duration: 150, sequenceQueue: false } }, 
      ];
    }
    $.Velocity.RunSequence(sequence);    
  }, 
  shareToFacebook: function(sessionId) {
    FB.ui({
      method: 'feed',
      link: 'https://broadcast-it-api.herokuapp.com/' + sessionId,
      caption: 'Join Live Stream',
    }, function(response) {
      if (window.deug) console.log('Facebook Response', response);
    });
  },
  addViewer: function() {
    this.state.viewCount++
    this.trigger('onViewCountChanged', this.state.viewCount);
  },
  removeViewer: function() {
    this.state.viewCount--    
    this.trigger('onViewCountChanged', this.state.viewCount);    
  },
  showExitScene: function() {

    var shareToFacebook = document.getElementById('shareToFacebook');
    var shareWithUrl = document.getElementById('shareWithUrl');
    var endBroadcast = document.getElementById('endBroadcast');
    var slider = document.getElementById('slider');    
    var dataContainer = document.getElementById('dataContainer');    
      
    var sequence = [
      { e: $(shareToFacebook), p: { opacity: 0 }, o: { duration: 150 } }, 
      { e: $(shareWithUrl), p: { opacity: 0 }, o: { duration: 150, sequenceQueue: false } }, 
      { e: $(endBroadcast), p: { opacity: 0 }, o: { duration: 150, sequenceQueue: false } },
      { e: $(dataContainer), p: { opacity: 0 }, o: { duration: 150, sequenceQueue: false } },
      { e: $(slider), p: { translateX: '-410px' }, o: { duration: 225, sequenceQueue: true } },              
    ];
      $.Velocity.RunSequence(sequence); 
  }
});
