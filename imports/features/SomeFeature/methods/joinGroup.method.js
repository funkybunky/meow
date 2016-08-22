/* global Meteor */
import { Groups } from 'imports/collections/groups.js';
import { check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

const joinGroup = new ValidatedMethod({
  name: 'joinGroup',

  validate(args) {
    check(args, String); // just takes the ID, a string
  },

  run(id) {
    console.log('Executing on client?', this.isSimulation);
    console.log('Got id of group to join:', id);
    const group = Groups.findOne(id);
    if (!group) throw new Meteor.Error('Given ID doesn\'t match any group.');
    if (Meteor.user()._id in group.members) {
      console.log('already in the group');
      return false;
    }
    const newMembers = group.members.concat(Meteor.user());
    Groups.update(id, {
      $set: {
        members: newMembers,
      },
    });
    Meteor.user().myGroups.push(id); // TODO: I don't think that this works..
    Meteor.users.update(Meteor.userId(), {
      $set: {
        myGroups: Meteor.user().myGroups.concat(id),
      },
    });
    return true;
  },
});

export default joinGroup;
