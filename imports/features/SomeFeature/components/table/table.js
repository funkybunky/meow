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

  getOpponentName = () => {
    const game = this.props.games[0];
    if (game.player1Id === this.props.user._id) {
      return game.player2Name;
    }
    console.log('bla');
    return 'bad guy';
  }

  render() {
    return (
      <div>
      {this.props.ready
        ? <div style={styles.root}>
          <h2>Table</h2>
          <h3>You: {this.props.user.username}</h3>
          <h3>Opponent: {this.getOpponentName}</h3>
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
