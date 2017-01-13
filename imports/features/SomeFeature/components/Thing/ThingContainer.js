import { Meteor } from 'meteor/meteor';
import { Games } from 'imports/collections/games.js';
import { createContainer } from 'meteor/react-meteor-data';
import { joinGame as _joinGame } from '../../methods';

import Thing from './Thing';
export default createContainer(() => {
  const gamesHandle = Meteor.subscribe('games.all');
  const userHandle = Meteor.subscribe('users.current');

  // Maybe write a higher-order function for this later
  const joinGame = (args, callback) => {
    console.log('joinGame handler. args: ', args);
    _joinGame.call(args, callback);
  };

  return {
    ready: gamesHandle.ready() && userHandle.ready(),
    games: Games.find({}).fetch(),
    joinGame,
    user: Meteor.user(),
  };
}, Thing);
