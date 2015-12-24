var OpenTok = require('opentok');
var env = require('../../env.js');

var opentok = new OpenTok(env.openTok.key, env.openTok.secret);

exports.renderIndex = function(req, res, next) {
  res.sendFile('./dist/index.html');
};

exports.createBroadcast = function(req, res, next) {
  opentok.createSession({
    mediaMode: 'routed'
  }, function(err, broadcast) {
  	if (err) return next(err);
  	res.status(200).send(broadcast);
  });
};

exports.joinBroadcast = function(req, res, next) {
  console.log("join broadcast");
};
