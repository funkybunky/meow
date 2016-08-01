import { Meteor } from 'meteor/meteor';

Meteor.publish('groups.all', () => Groups.find());
