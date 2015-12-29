'use strict';

var Reflux = require('reflux');
var StyleSheet = require('react-style');

var Disabled = React.createClass({
  getInitialState: function() {
    return { showDisabled: (window.innerWidth <= 900 || window.innerHeight <= 300) };
  },
  componentDidMount: function() {
    window.addEventListener('resize', this.resizeEvent);
  },
  resizeEvent: function(event) {
    if (window.innerWidth <= 900 || window.innerHeight <= 300 && !this.state.showDisabled)  {
      this.setState({ showDisabled: true });
    } else if (this.state.showDisabled) {
      this.setState({ showDisabled: false });
    }
  },
  render: function() {
    return (
      <div styles={this.state.showDisabled ? styles.showDisabled : styles.hideDisabled}>
        <p styles={styles.title}>BROADCAST DISABLED</p>
        <p styles={styles.subtitle}>PLEASE RESIZE YOUR BROWSER</p>
      </div>
    )
  },
});

var styles = StyleSheet.create({
  showDisabled: {
    position: 'fixed',  
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    zIndex: 5,
    textAlign: 'center'
  },
  hideDisabled: {
    display: 'none'
  },
  title: {
    color: 'white',
    fontSize: 36,
    fontWeight: 400,
    marginTop: 175,
    marginBottom: 0
  },
  subtitle: {
    color: 'rgb(132, 138, 255)',
    fontSize: 18,
    fontWeight: 300
  }
});

module.exports = Disabled;
