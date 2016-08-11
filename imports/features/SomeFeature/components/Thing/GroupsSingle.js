import React from 'react';
import Radium from 'radium';

const GroupsSingle = (props) => {
  console.log('whuu');
  const groupId = props.params.id;
  const group = props.groups.filter((group) => group._id === groupId)[0];
  if (!group) console.log('nooo! param ID doesnt match any group. redirect!');
  return (
    <div>
      <h2>{group.name}</h2>
    </div>
  );
};

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

GroupsSingle.propTypes = {
  groups: React.PropTypes.array,
};

export default Radium(GroupsSingle);
