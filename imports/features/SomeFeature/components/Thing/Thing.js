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

  _addProps = (element) => {
    return React.cloneElement(element, {
      groups: this.props.groups,
      createGroup: this.props.createGroup,
    });
  }

  render() {
    // return (
    //   <div>Thing {React.cloneElement(this.props.children, { groups: this.props.groups })}</div>
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
            groups: this.props.groups,
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
  groups: React.PropTypes.array,
  // groups cannot be required, cause it will be available after the
  // subscription is ready, so on first render it won't be defined
  children: React.PropTypes.element,
};

export default Radium(Thing);
