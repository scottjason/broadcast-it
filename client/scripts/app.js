var React = window.React = require('react');
var ReactDOM = require("react-dom");
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var createBrowserHistory = require('history/lib/createBrowserHistory');
var StyleSheet = require('react-style');
var AppStore = require('./stores/AppStore');
var Connect = require('./components/Connect.js');
var Session = require('./components/Session.js');


var App = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentWillMount: function() {
    AppStore.addChangeListener(this.stateHasChanged);
  },
  stateHasChanged: function() {
    AppStore.removeChangeListener(this.stateHasChanged);
    var session = AppStore.getSession();
    console.log('session', session);
  },
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

ReactDOM.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}></Route>
    <Route path="session" component={Session} />
  </Router>
), document.getElementById('app'));

module.exports = Route;