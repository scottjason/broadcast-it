var opts = {
  Animator: {
    duration: 500,
    easing: 'swing'
  },
  bigFixedRatio: false
};

var layoutContainer = document.getElementById('layoutContainer');
var layout = initLayoutContainer(layoutContainer, opts).layout;

var streamElem = document.getElementById("stream");
var session = OT.initSession(key, sessionId);

session.connect(token, function(error) {
  if (error) {
    console.log("Error connecting: ", error.code, error.message);
  } else {
    console.log("Connected to the session.");
  }
});

session.on("streamCreated", function(event) {
  console.log("New stream in the session: " + event.stream.streamId);
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
