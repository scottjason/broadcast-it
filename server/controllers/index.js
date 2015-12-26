var OpenTok = require('opentok');
var Bitly = require('bitly');
var config = require('../config/index.js');
var redis = require('redis');
var client = redis.createClient(config.redisUrl, {
  no_ready_check: true
});

client.set('foo', 'bar');
client.get('foo', function(err, reply) {
  console.log(reply.toString()); // Will print `bar`
});

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
    var expiresAt = new Date().getTime() + 180000 // three minutes
    var opts = {};
    opts.role = 'moderator';
    session.token = opentok.generateToken(session.sessionId, opts);
    session.key = session.ot.apiKey;
    session.role = opts.role;
    session.expiresAt = expiresAt;
    var str = JSON.stringify(session);
    client.set(session.sessionId, str);
    res.status(200).send(session);
  });
};

exports.redirect = function(req, res, next) {
  res.redirect('/');
};

exports.joinBroadcast = function(req, res, next) {
  
  var opts = {};

  // first see if the publisher hit refresh
  client.get(req.params.sessionId, function(err, session) {
    session = JSON.parse(session);

    // check expiration
    var isExpired = (new Date().getTime() >= session.expiresAt);
    if (isExpired) {
      console.log("Expired Broadcast .. Remove and Notify");
      return;
    }
    // render
    res.locals.token = opentok.generateToken(req.params.sessionId, opts);
    res.locals.fbAppId = '187072508310833';
    res.locals.siteUrl = 'https://broadcast-it.herokuapp.com/' + req.params.sessionId;
    res.locals.key = process.env.opentokKey || config.opentok.key;
    res.locals.sessionId = req.params.sessionId;
    res.render('stream');

  });
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
