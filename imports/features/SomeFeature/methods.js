import { Games } from 'imports/collections/games.js';
import { check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const joinGame = new ValidatedMethod({
  name: 'joinGame',

  validate(args) {
    check(args, {
      playerId: String,
    });
  },

  run({ playerId }) {
    console.log('Executing on client?', this.isSimulation);
    console.log('Got id:', playerId);
    const currentGame = Games.findOne({});
    console.log('game: ', currentGame);
    if (currentGame.player1Id) {
      if (currentGame.player2Id) {
        throw new Error('game already full');
      }
      Games.update(currentGame._id, { $set: { player2Id: playerId } });
    } else {
      Games.update(currentGame._id, { $set: { player1Id: playerId } });
    }
    return true;
  },
});

export const updateGroup = new ValidatedMethod({
  name: 'updateGroup',

  validate(args) {
    check(args, {
      _id: String,
      name: String,
    });
  },

  run({ _id, name }) {
    console.log('Executing on client?', this.isSimulation);
    console.log('Got name:', name);
    Games.update(_id, {
      name,
    });
    return true;
  },
});

export const deleteGroup = new ValidatedMethod({
  name: 'deleteGroup',

  validate(args) {
    check(args, String); // the ID
  },

  run(id) {
    console.log('Executing on client?', this.isSimulation);
    console.log('Got id:', id);
    Games.remove(id);
    return true;
  },
});
