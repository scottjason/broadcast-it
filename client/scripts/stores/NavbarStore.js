var Reflux = require('reflux');
var Api = require('../api/index.js');
var actions = require('../actions');

module.exports = Reflux.createStore({
  state: {
    viewCount: 0
  },
  init: function() {
    this.listenTo(actions.createShortUrl, this.createShortUrl);
    this.listenTo(actions.toggleUrl, this.toggleUrl);
    this.listenTo(actions.shareToFacebook, this.shareToFacebook);
    this.listenTo(actions.addViewer, this.addViewer);
    this.listenTo(actions.removeViewer, this.removeViewer);
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
    this.state.isToggled = !this.state.isToggled;
    if (this.state.isToggled) {
      Velocity(document.getElementById("shareToFacebook"), { opacity: 0 }, { display: "none" }, { duration: 1 });
      Velocity(document.getElementById("shareWithUrl"), { opacity: 0 }, { display: "none" }, { duration: 1 });
      Velocity(document.getElementById("endBroadcast"), { opacity: 0 }, { display: "none" }, { duration: 1 });
      Velocity(document.getElementById("slider"), { translateX: -400 }, { duration: 225 });    
      Velocity(document.getElementById("cross"), { opacity: 1 }, { duration: 225 }); 
      Velocity(document.getElementById("cross"), { rotateZ: 720 }, { duration: 500 });
    } else {
      Velocity(document.getElementById("cross"), { rotateZ: -720 }, { duration: 500 });
      Velocity(document.getElementById("cross"), { opacity: 0 }, { duration: 225 });      
      Velocity(document.getElementById("slider"), { translateX: 400 }, { delay: 500, duration: 225 });
      setTimeout(function() {
        Velocity(document.getElementById("shareToFacebook"), { opacity: 1 }, { display: 'inline-block' }, { duration: 50 });           
        Velocity(document.getElementById("shareWithUrl"), { opacity: 1 }, { display: "inline-block" }, { duration: 50 });
        Velocity(document.getElementById("endBroadcast"), { opacity: 1 }, { display: "inline-block" }, { duration: 50 });
      }, 375);
    }
  }, 
  shareToFacebook: function(sessionId) {
    FB.ui({
      method: 'feed',
      link: 'https://broadcast-it-api.herokuapp.com/' + sessionId,
      caption: 'Join Live Stream',
    }, function(response) {
      console.log('Facebook Response', response);
    });
  },
  addViewer: function() {
    this.state.viewCount++
    this.trigger('onViewCountChanged', this.state.viewCount);
  },
  removeViewer: function() {
    this.state.viewCount--    
    this.trigger('onViewCountChanged', this.state.viewCount);    
  }
});
