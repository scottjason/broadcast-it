var OpenTok = require('opentok');
var Bitly = require('bitly');
var config = require('../config/index.js');

var bitly = new Bitly(process.env.BITLY_KEY || config.bitly);

var env = {};

if (process.env.NODE_ENV !== 'production') {
  env = require('../../env.js');
}

var opentok = new OpenTok(process.env.opentokKey || env.openTok.key, process.env.opentokSecret || env.openTok.secret);

exports.renderIndex = function(req, res, next) {
  res.sendFile('./dist/index.html');
};

exports.createSession = function(req, res, next) {
  opentok.createSession({
    mediaMode: 'routed'
  }, function(err, session) {
    if (err) return next(err);
    var opts = {};
    opts.role = 'moderator';
    session.token = opentok.generateToken(session.sessionId, opts);
    session.key = session.ot.apiKey;
    res.status(200).send(session);
  });
};

exports.joinBroadcast = function(req, res, next) {
  var tokenOpts = {};
  tokenOpts.role = "subscriber";
  var token = opentok.generateToken(req.params.sessionId, tokenOpts);
  res.locals.token = token;
  res.locals.fbAppId = '187072508310833';
  res.locals.siteUrl = 'https://broadcast-it.herokuapp.com/' + req.params.sessionId;
  res.locals.key = process.env.opentokKey || config.opentok.key;
  res.locals.sessionId = req.params.sessionId;
  res.render('stream');
};

exports.generateShortUrl = function(req, res, next) {
  bitly.shorten(req.body.longUrl)
    .then(function(response) {
      res.status(200).send({
        url: response.data.url
      });
    }, function(error) {
      console.log(err);
      next(err)
    });
};
