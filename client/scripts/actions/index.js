var Reflux = require('reflux');

var actions = Reflux.createActions([
  'createSession',
  'getSession',
  'startBroadcast',
  'createShortUrl',
  'toggleUrl',
  'shareToFacebook',
  'addViewer',
  'removeViewer'
]);

module.exports = actions;