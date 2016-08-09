import React, { Component } from 'react';
import Radium from 'radium';

const GroupElem = (props) => <div><h2>{props.name}</h2><hr /></div>;

class ListGroups extends Component {

  render() {
    return (
      <div>
        <h2>All Groups:</h2>
        {this.props.groups.map((group) =>
          <GroupElem name={group.name} key={group._id} />
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
  groups: React.PropTypes.array.isRequired,
};

export default Radium(ListGroups);
