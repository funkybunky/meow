import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

import { globalizeData } from '../helpers';

export const Bets = new Mongo.Collection('bet');

export const Bet = Class.create({
  name: 'Entry',
  collection: Bets,
  fields: {
    playerId: {
      type: String,
    },
    gameId: {
      type: String,
    },
    bet: {
      type: Number,
    },
  },
});

globalizeData({ Bets }, { Bet });
