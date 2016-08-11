/* global Meteor */
import React from 'react';
import GroupsList from './ListGroups';

const GroupsMy = (props) => {
  const userGroupIds = Meteor.user().myGroups;
  if (!userGroupIds) throw new Error('NOOOOO');
  const userGroups = userGroupIds.reduce((myGroups, groupId) => {
    const groups = props.groups.filter((group) => group._id === groupId);
    if (groups.length === 1) {
      return myGroups.concat(groups);
    }
    return myGroups;
  }, []);
  const GroupsListMy = React.cloneElement(GroupsList, { groups: userGroups });
  return GroupsListMy;
};

export default GroupsMy;
