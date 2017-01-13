import { Meteor } from 'meteor/meteor';
import { Games } from 'imports/collections/games';

Meteor.publish('games.all', () => Games.find());

Meteor.publish('users.current', function () {
  console.log('user pub - user. ', Meteor.users.findOne(this.userId));
  return Meteor.users.find(this.userId, {
    fields: {
      username: 1,
      emails: 1,
      myGames: 1,
      createdAt: 1,
    },
  });
});
