var OpenTok = require('opentok');
var env = require('../../env.js');

var opentok = new OpenTok(env.openTok.key, env.openTok.secret);

exports.renderIndex = function(req, res, next) {
  res.sendFile('./dist/index.html');
};

exports.createSession = function(req, res, next) {
  opentok.createSession({
    mediaMode: 'routed'
  }, function(err, session) {
    if (err) return next(err);
    session.token = opentok.generateToken(session.sessionId);
    session.key = session.ot.apiKey;
    session.isPublisher = true;
    res.status(200).send(session);
  });
};

exports.joinBroadcast = function(req, res, next) {
  console.log("join broadcast");
};
