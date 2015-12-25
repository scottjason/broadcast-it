'use strict';

var React = window.React = require('react');
var StyleSheet = require('react-style');
var SessionActions = require('../actions/SessionActions.js');
var SessionStore = require('../stores/SessionStore.js');

var Session = React.createClass({
  getInitialState: function() {
    return {
      session: SessionStore.getSession()
    }
  },
  componentDidMount: function() {
    var session = OT.initSession(this.state.session.key, this.state.session.sessionId);
    session.connect(this.state.session.token, function(error) {
      if (error) {
        console.log(error.message);
      } else {
        var opts = {
          Animator: {
            duration: 500,
            easing: 'swing'
          },
          bigFixedRatio: false
        };
        var layoutContainer = document.getElementById('layoutContainer');
        var layout = initLayoutContainer(layoutContainer, opts).layout;

        session.publish("publisherContainer");
        layout();
        var resizeTimeout;
        window.onresize = function() {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(function() {
            layout();
          }, 20);
        };
      }
    });

  },
  render: function() {
    return (
      <div id='layoutContainer'>
         <div id="publisherContainer"></div>
      </div>
    )
  },
});


module.exports = Session;
