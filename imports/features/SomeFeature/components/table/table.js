/* global Meteor */
import React, { Component } from 'react';
import Radium from 'radium';

class Table extends Component {

  state = {
    hasJoinedGame: false,
  };

  _addProps = (element) => React.cloneElement(element, {
    games: this.props.games,
    user: this.props.user,
  })

  getGame = () => {
    if (!this.props.games[0]) {
      throw new Meteor.Error('NO GAME!');
    }
    return this.props.games[0];
  }

  getUserPlayer = () => {
    const game = this.getGame();
    if (game.player1Id !== this.props.user._id) {
      // Current user is player1.
      return {
        _id: game.player1Id,
        balance: game.player1Balance,
        name: game.player1Name,
      };
    }
    // Current user is not player1 which means that player1 is the user.
    return {
      _id: game.player2Id,
      balance: game.player2Balance,
      name: game.player2Name,
    };
  }

  getOpponentPlayer = () => {
    const game = this.getGame();
    if (game.player1Id === this.props.user._id) {
      // Current user is player1, player2 is opponent.
      return {
        _id: game.player2Id,
        balance: game.player2Balance,
        name: game.player2Name,
      };
    }
    // Current user is player2 which means that player1 is the opponent.
    return {
      _id: game.player1Id,
      balance: game.player1Balance,
      name: game.player1Name,
    };
  }

  isOpponentLive = () => {
    const opponent = this.getOpponentPlayer();
    if (!opponent._id) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div>
      {this.props.ready
        ? <div style={styles.root}> {/* TODO: add a new check here whether game exists, if not show some user feedback, but not important for now */}
          <h2>Table</h2>
          <h3>You: {this.props.user.username}</h3>
          <p>Your stack: {this.getUserPlayer().balance}</p>
          {this.isOpponentLive()
            ? <div>
                <h3>Opponent: {this.getOpponentPlayer().name}</h3>
                <p>stack: {this.getOpponentPlayer().balance} </p>
              </div>
            : <div>Waiting for your opponent</div>
          }
          {React.Children.map(this.props.children, this._addProps)}
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

Table.propTypes = {
  ready: React.PropTypes.bool.isRequired,
  games: React.PropTypes.array,
  // games cannot be required, cause it will be available after the
  // subscription is ready, so on first render it won't be defined
  children: React.PropTypes.element,
  user: React.PropTypes.object,
};

export default Radium(Table);
