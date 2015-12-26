var Reflux = require('reflux');

var actions = Reflux.createActions([
  'createSession',
  'getSession',
  'createShortUrl',
  'toggleUrl'
]);

module.exports = actions;