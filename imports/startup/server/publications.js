import { Meteor } from 'meteor/meteor';
import { Groups } from '/imports/collections/groups';

Meteor.publish('groups.all', () => Groups.find());
