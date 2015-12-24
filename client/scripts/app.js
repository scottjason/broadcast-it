var React = window.React = require('react');
var ReactDOM = require("react-dom");
var StyleSheet = require('react-style');
var Connect = require('./components/Connect.js');


var App = React.createClass({

  render: function() {
    return (
      <div styles={styles.container}>
      <Connect></Connect>
      </div>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    position: 'relative',
    width: '100%',
    height: '100vh'
  }
});


ReactDOM.render(<App />, document.getElementById("app"));
