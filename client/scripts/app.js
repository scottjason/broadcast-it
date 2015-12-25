var React = window.React = require('react');
var ReactDOM = require("react-dom");
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var Connect = require('./components/Connect.js');
var Session = require('./components/Session.js');

ReactDOM.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Connect}></Route>
    <Route path="session" component={Session} />
  </Router>
), document.getElementById('app'));
