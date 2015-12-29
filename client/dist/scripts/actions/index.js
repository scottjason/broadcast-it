var Reflux = require('reflux');

var actions = Reflux.createActions([
  'createSession',
  'getSession',
  'startBroadcast',
  'endBroadcast',
  'createShortUrl',
  'toggleUrl',
  'shareToFacebook',
  'addViewer',
  'removeViewer',
  'showExitScene',
  'expireSession'
]);

module.exports = actions;