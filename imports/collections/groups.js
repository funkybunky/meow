import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

import { globalizeData } from '../helpers';

export const Groups = new Mongo.Collection('Groups');

export const Group = Class.create({
  name: 'Entry',
  collection: Groups,
  fields: {
    name: String,
    // description: String,
    members: [String],
  },
});

globalizeData({ Groups }, { Group });
