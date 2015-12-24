exports.renderIndex = function(req, res, next) {
  res.sendFile('./dist/index.html');
};

exports.createBroadcast = function(req, res, next) {
  console.log("create broadcast");
};

exports.joinBroadcast = function(req, res, next) {
  console.log("join broadcast");
};
