var OpenTok = require('opentok');
var Bitly = require('bitly');
var config = require('../config/index.js');
var redis = require('redis');

var env = (process.env.NODE_ENV !== 'production') ? require('../../env.js') : {};
var client = redis.createClient(config.redisUrl, { no_ready_check: true });

var bitly = new Bitly(process.env.BITLY_KEY || config.bitly);
var opentok = new OpenTok(process.env.opentokKey || env.openTok.key, process.env.opentokSecret || env.openTok.secret);

exports.renderIndex = function(req, res, next) {
  res.sendFile('./dist/index.html');
};

exports.redirect = function(req, res, next) {
  res.redirect('/');
};

exports.expireSession = function(req, res, next) {
  console.log("expiring session");
  client.del(req.params.sessionId, redis.print);  
  res.status(200).send();
};

exports.createSession = function(req, res, next) {
  opentok.createSession({
    mediaMode: 'routed'
  }, function(err, session) {
    if (err) return next(err);
    var expiresAt = new Date().getTime() + 180000; // three minutes from now
    var opts = {};
    opts.role = 'moderator';
    session.token = opentok.generateToken(session.sessionId, opts);
    session.key = session.ot.apiKey;
    session.role = opts.role;
    session.expiresAt = expiresAt;
    var str = JSON.stringify(session);
    client.set(session.sessionId, str, redis.print);  
    client.expire(session.sessionId, 180);
    res.status(200).send(session);
  });
};

exports.joinBroadcast = function(req, res, next) {

  client.get(req.params.sessionId, function(err, session) {
    
    var opts = {};

    opts.fbAppId = '187072508310833';
    opts.siteUrl = 'https://broadcast-it.herokuapp.com/' + req.params.sessionId;

    if (session) {
      session = JSON.parse(session);
    }

    var isInvalid = (!session || !!err || (new Date().getTime() >= session.expiresAt));
    if (isInvalid) {
      res.render('expired', opts);
      return;
    }

    opts.role = 'subscriber';
    opts.token = opentok.generateToken(req.params.sessionId, opts);
    opts.key = process.env.opentokKey || env.openTok.key;
    opts.sessionId = req.params.sessionId;
    opts.expiresAt = session.expiresAt;
    res.render('subscriber', opts);
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
