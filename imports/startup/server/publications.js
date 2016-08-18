import { Meteor } from 'meteor/meteor';
import { Groups } from 'imports/collections/groups';

Meteor.publish('groups.all', () => Groups.find());
Meteor.publish('users.current', function () {
  console.log('user pub - user. ', Meteor.users.findOne(this.userId));
  return Meteor.users.find(this.userId, {
    fields: {
      username: 1,
      emails: 1,
      myGroups: 1,
      createdAt: 1,
    },
  });
});
