/* global Meteor */
import { Class } from 'meteor/jagi:astronomy';

import { globalizeData } from '../helpers';

const User = Class.create({
  name: 'User',
  collection: Meteor.users,
  fields: {
    username: String,
    createdAt: Date,
    emails: {
      type: [Object],
      default() {
        return [];
      },
    },
    profile: Object,
    myGroups: {
      type: [String],
      default: [],
    },
  },
});

if (Meteor.isServer) {
  User.extend({
    fields: {
      services: Object,
    },
  });
}

globalizeData({ Meteor.users }, { User });
