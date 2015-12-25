var Api = require('../api/index.js');
var Dispatcher = require('../dispatcher/index.js');
var EventEmitter = require('events').EventEmitter;
var merge = require('merge');

var state = {};

function generateShortUrl(opts) {
  var requestOpts = {};
  requestOpts.url = '/shortUrl';
  requestOpts.longUrl = 'https://broadcast-it-api.herokuapp.com/' + opts.sessionId;
  Api.post(requestOpts, function(err, results){
    state.shortUrl = results.url;
    NavbarStore.emitChange();
  });
}

function toggleSlider() {
  state.isToggled = !state.isToggled;
  if (state.isToggled) {
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
}

var NavbarStore = merge(EventEmitter.prototype, {

  getShortUrl: function() {
    return state.shortUrl;
  },
  emitChange: function() {
    this.emit('change');
  },
  addChangeListener: function(cb) {
    this.on('change', cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener('change', cb);
  }
});

Dispatcher.register(function(action) {
  var type = action.type;
  if (type === 'toggle') {
    return toggleSlider();
  } else if (type === 'shortUrl') {
    generateShortUrl(action.opts);
  }
  return true;
});

module.exports = NavbarStore;
