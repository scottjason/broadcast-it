var opts = {
  Animator: {
    duration: 500,
    easing: 'swing'
  },
  bigFixedRatio: false
};

var layoutContainer = document.getElementById('layoutContainer');
var layout = initLayoutContainer(layoutContainer, opts).layout;

var streamElem = document.getElementById('stream');
var session = OT.initSession(key, sessionId);

session.connect(token, function(error) {
  if (error) {
    console.log('Error connecting: ', error.code, error.message);
  }
});

session.on('streamCreated', function(event) {
  session.subscribe(event.stream, streamElem);
  layout();
  var resizeTimeout;
  window.onresize = function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      layout();
    }, 20);
  };
});

session.on('streamDestroyed', function(event) {
  document.getElementById('dataContainer').style.display = 'none';
  document.getElementById('exit').style.display = 'block';
});
