import { Games } from '../../collections/games.js';

Meteor.startup(() => {
  // DB pre-population here
  // Games.remove({});
  // console.log('removed all existing games. available games: ', Games.find().count());
});
