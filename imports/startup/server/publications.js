import { Meteor } from 'meteor/meteor';
import { Groups } from '/imports/collections/groups';

Meteor.publish('groups.all', () => Groups.find());
Meteor.publish('users.current', () => Meteor.users.find());
