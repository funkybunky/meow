import { Games, Game } from 'imports/collections/games.js';
import { Users } from 'imports/collections/users.js';
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
    console.log('Method joinGame. Executing on client?', this.isSimulation);
    console.log('Got id:', playerId);
    console.log('userId: ', this.userId);
    if (!this.userId) {
      throw new Error('you must be logged in to join a game');
    }
    const userId = this.userId;
    const userName = Users.findOne(userId).username;
    let currentGame = Game.findOne();
    console.log('game: ', currentGame);
    if (!currentGame) {
      const newGame = new Game({
        hasStarted: false,
        isBettingPhase: true,
        player1Id: '',
        player1Name: '',
        player1Balance: 0,
        player2Id: '',
        player2Name: '',
        player2Balance: 0,
        blind: 10,
        player1Bet: 0,
        player2Bet: 0,
      });
      newGame.save();
      currentGame = newGame;
      console.log('new game created!');
    }
    if (currentGame.player1Id) {
      if (currentGame.player2Id) {
        throw new Error('game already full');
      }
      if (currentGame.player1Id === playerId) {
        throw new Error('you already joined the game, dude!');
      }
      currentGame.player2Id = playerId;
      currentGame.player2Name = userName;
    } else {
      currentGame.player1Id = playerId;
      currentGame.player1Name = userName;
    }
    currentGame.save();
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
