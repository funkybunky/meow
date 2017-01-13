import React, { Component } from 'react';
import Radium from 'radium';

class Thing extends Component {
  callMethod = () => {
    this.props.createGroup({ name: 'Unknown' }, (error, result) => {
      console.log(error, result);
    });
  };

  showProps = () => {
    console.log(this.props);
  };

  _addProps = (element) => React.cloneElement(element, {
    games: this.props.games,
    createGroup: this.props.createGroup,
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
              Call Meteor method
            </button>
          </div>
          {React.Children.map(this.props.children, this._addProps)}
          {/* {React.cloneElement(this.props.children, {
            games: this.props.games,
            createGroup: this.props.createGroup,
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
  createGroup: React.PropTypes.func.isRequired,
  games: React.PropTypes.array,
  // games cannot be required, cause it will be available after the
  // subscription is ready, so on first render it won't be defined
  children: React.PropTypes.element,
  joinGroup: React.PropTypes.func.isRequired,
  user: React.PropTypes.object,
};

export default Radium(Thing);
