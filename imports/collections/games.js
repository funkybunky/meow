import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

import { globalizeData } from '../helpers';

export const Games = new Mongo.Collection('game');

export const Game = Class.create({
  name: 'Entry',
  collection: Games,
  fields: {
    hasStarted: {
      type: Boolean,
      label: 'is true when two players are connected to the game and are ready',
    },
    isBettingPhase: {
      type: Boolean,
      label: `Is true when the players can place their bets. We have two phases
      in each game: a betting phase and an evaluation phase where the app
      decides who won`,
    },
    player1Id: {
      type: String,
      label: '',
    },
    player1Name: {
      type: String,
    },
    player1Balance: {
      type: Number,
      label: 'Total balance',
    },
    player2Id: {
      type: String,
      label: '',
    },
    player2Name: {
      type: String,
    },
    player2Balance: {
      type: Number,
      label: 'Total balance',
    },
    blind: {
      type: Number,
      label: 'Mandatory Einsatz that every player has to pay to participate',
    },
    player1Bet: {
      type: Number,
    },
    player2Bet: {
      type: Number,
    },
  },
});

globalizeData({ Games }, { Game });
