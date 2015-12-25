var request = require('browser-request');

var Api = {
  get: function(url, cb) {
    request(url, function(err, response, body) {
      if (err) return cb(err);
      cb(null, response);
    });
  }
};

module.exports = Api;
