var request = require('browser-request');

var Api = {
  get: function(url, cb) {
    request(url, function(err, response, body) {
      if (err) cb(err);
      cb(null, err);
    });
  }
};

module.exports = Api;