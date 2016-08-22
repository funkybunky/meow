/* global Meteor */
import React from 'react';
import GroupsList from './ListGroups';

const GroupsMy = (props) => {
  const userGroupIds = props.user.myGroups;
  if (!userGroupIds) throw new Error('NOOOOO myGroups prop not on user obj');
  const userGroups = userGroupIds.reduce((myGroups, groupId) => {
    const groups = props.groups.filter((group) => group._id === groupId);
    if (groups.length === 1) {
      return myGroups.concat(groups);
    }
    return myGroups;
  }, []);
  return (
    <GroupsList
      groups={userGroups}
      joinGroup={props.joinGroup}
      title="My Groups"
    />
  );
};

GroupsMy.propTypes = {
  groups: React.PropTypes.array,
  joinGroup: React.PropTypes.func,
  user: React.PropTypes.object,
};

export default GroupsMy;
