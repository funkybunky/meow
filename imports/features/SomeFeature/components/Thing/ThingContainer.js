import { Meteor } from 'meteor/meteor';
import { Groups } from 'imports/collections/groups.js';
import { createContainer } from 'meteor/react-meteor-data';
import { createGroup as _createGroup } from '../../methods';
import joinGroup from 'imports/features/SomeFeature/methods/joinGroup.method';

import Thing from './Thing';
export default createContainer(() => {
  const groupsHandle = Meteor.subscribe('groups.all');
  const userHandle = Meteor.subscribe('users.current');

  // Maybe write a higher-order function for this later
  const createGroup = (args, callback) => {
    console.log('createGroup handler');
    _createGroup.call(args, callback);
  };

  const joinGroupHandler = (args, cb) => {
    console.log('joinGroupHandler');
    joinGroup.call(args, cb);
  };

  return {
    ready: groupsHandle.ready() && userHandle.ready(),
    groups: Groups.find({}).fetch(),
    createGroup,
    joinGroup: joinGroupHandler,
    user: Meteor.user(),
  };
}, Thing);
