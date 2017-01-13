import { Meteor } from 'meteor/meteor';
import { Games } from 'imports/collections/games.js';
import { createContainer } from 'meteor/react-meteor-data';
import { createGroup as _createGroup } from '../../methods';

import Thing from './Thing';
export default createContainer(() => {
  const gamesHandle = Meteor.subscribe('games.all');
  const userHandle = Meteor.subscribe('users.current');

  // Maybe write a higher-order function for this later
  const createGroup = (args, callback) => {
    console.log('createGroup handler');
    _createGroup.call(args, callback);
  };

  return {
    ready: gamesHandle.ready() && userHandle.ready(),
    games: Games.find({}).fetch(),
    createGroup,
    user: Meteor.user(),
  };
}, Thing);
