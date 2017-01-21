import { Meteor } from 'meteor/meteor';
import { Games } from 'imports/collections/games.js';
import { createContainer } from 'meteor/react-meteor-data';
import { placeBet } from '../../methods';

import Table from './table';

export default createContainer(() => {
  const gamesHandle = Meteor.subscribe('games.all');
  const userHandle = Meteor.subscribe('users.current');

  return {
    ready: gamesHandle.ready() && userHandle.ready(),
    games: Games.find({}).fetch(),
    user: Meteor.user(),
    placeBet,
  };
}, Table);
