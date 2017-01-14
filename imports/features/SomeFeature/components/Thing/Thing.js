import React, { Component } from 'react';
import Radium from 'radium';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';

class Thing extends Component {

  state = {
    hasJoinedGame: false,
  };

  callMethod = () => {
    this.props.joinGame({ playerId: this.props.user._id }, (error, result) => {
      console.log('callMethod callback: ', error, result);
      if (result) {
        this.setState({
          hasJoinedGame: true,
        });
        browserHistory.push('/table');
      } else {
        Bert.alert(error, 'warning');
      }
    });
  };

  showProps = () => {
    console.log(this.props);
  };

  _addProps = (element) => React.cloneElement(element, {
    games: this.props.games,
    joinGame: this.props.joinGame,
    user: this.props.user,
  })

  render() {
    // return (
    //   <div>Thing {React.cloneElement(this.props.children, { games: this.props.games })}</div>
    // );
    return (
      <div>
      {this.props.ready
        ? <div style={styles.root}>
          <div>
            <button
              style={styles.button}
              onClick={this.showProps}
            >
              Dump props
            </button>
          </div>
          <div>
            <button
              style={styles.button}
              onClick={this.callMethod}
            >
              Join Game!
            </button>
          </div>
          {React.Children.map(this.props.children, this._addProps)}
          {/* {React.cloneElement(this.props.children, {
            games: this.props.games,
            joinGame: this.props.joinGame,
          })} */}
        </div>
      : <div>Loading</div>
    }
      </div>
    );
  }
}

const styles = {
  root: {
    display: 'inline',
  },
  button: {
    background: '#eee',
    border: '1px solid #ddd',
    fontSize: 24,
  },
};

Thing.propTypes = {
  ready: React.PropTypes.bool.isRequired,
  joinGame: React.PropTypes.func.isRequired,
  games: React.PropTypes.array,
  // games cannot be required, cause it will be available after the
  // subscription is ready, so on first render it won't be defined
  children: React.PropTypes.element,
  user: React.PropTypes.object,
};

export default Radium(Thing);
