var request = require('browser-request');

var Api = {
  get: function(url, cb) {
    request(url, function(err, response, body) {
      if (err) return cb(err);
      cb(null, response);
    });
  },
  post: function(opts, cb) {
    request({method:'POST', url:opts.url, body:opts, json:true}, onResponse)
    function onResponse(err, response, body) {
      cb(err, body);
    }
  }
};

module.exports = Api;
