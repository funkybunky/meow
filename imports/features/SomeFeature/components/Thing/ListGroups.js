import React, { Component } from 'react';
import Radium from 'radium';

class GroupElem extends Component {
  handleJoinClick = (event) => {
    event.preventDefault();
    this.props.joinGroup(this.props.id);
  }
  render() {
    return (
      <div>
        <a href={`/groups/${this.props.id}`}><h2>{this.props.name}</h2></a>
        <button onClick={this.handleJoinClick}>Join</button>
        <hr />
      </div>
    );
  }
}

// TODO: see if you can change it to a stateless component, works with Radium?
class ListGroups extends Component {

  render() {
    return (
      <div>
        <h2>{this.props.title ? this.props.title : 'All Groups'}:</h2>
        {this.props.groups.map((group) =>
          <GroupElem
            name={group.name}
            key={group._id}
            id={group._id}
            joinGroup={this.props.joinGroup}
          />
        )}
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

ListGroups.propTypes = {
  groups: React.PropTypes.array,
  joinGroup: React.PropTypes.func,
  title: React.PropTypes.string,
};

export default Radium(ListGroups);
