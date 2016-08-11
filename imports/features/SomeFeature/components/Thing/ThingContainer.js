import { Meteor } from 'meteor/meteor';
import { Groups } from 'imports/collections/groups.js';
import { createContainer } from 'meteor/react-meteor-data';
import { createGroup as _createGroup } from '../../methods';
import joinGroup from 'imports/features/SomeFeature/methods/joinGroup.method';

import Thing from './Thing';
export default createContainer(() => {
  const groupsHandle = Meteor.subscribe('groups.all');

  // Maybe write a higher-order function for this later
  const createGroup = (args, callback) => {
    _createGroup.call(args, callback);
  };

  const joinGroupHandler = (args, cb) => {
    joinGroup.call(args, cb);
  };

  return {
    ready: groupsHandle.ready(),
    groups: Groups.find({}).fetch(),
    createGroup,
    joinGroup: joinGroupHandler,
  };
}, Thing);
