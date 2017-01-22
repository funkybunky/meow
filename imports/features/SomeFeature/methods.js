/* global Meteor */
import { Games, Game } from 'imports/collections/games.js';
import { Bets, Bet } from 'imports/collections/bets.js';
// import { Users } from 'imports/collections/users.js';
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
    const userName = Meteor.users.findOne(userId).username;
    console.log('userName: ', userName);

    let currentGame = Game.findOne();
    console.log('game: ', currentGame);
    if (!currentGame) {
      const newGame = new Game({
        hasStarted: false,
        isBettingPhase: true,
        player1Id: '',
        player1Name: '',
        player1Balance: 100,
        player2Id: '',
        player2Name: '',
        player2Balance: 100,
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

export const deleteGame = new ValidatedMethod({
  name: 'deleteGame',

  validate(args) {
    check(args, String); // the ID of the game to delete
  },

  run(id) {
    console.log('Executing on client?', this.isSimulation);
    console.log('Got id:', id);
    Games.remove(id);
    return true;
  },
});

export const deleteAllGames = new ValidatedMethod({
  name: 'deleteAllGames',

  validate() {
  },

  run() {
    Games.remove({});
    console.log('removed all games. current number of games: ',
    Games.find({}).count());
    return true;
  },
});

export const placeBet = new ValidatedMethod({
  name: 'placeBet',

  validate(args) {
    check(args, {
      gameId: String,
      bet: Number,
    });
  },

  run({ bet, gameId }) {
    console.log('Executing on client?', this.isSimulation);
    console.log('Got bet and game id:', bet, gameId);
    const userId = this.userId;
    const game = Game.findOne(gameId);
    console.log('game: ', JSON.stringify(game, null, 2));

    // game holen um zu sehen, ob der spieler im game ist
    if (game.player1Id !== userId && game.player2Id !== userId) {
      throw new Meteor.Error('you are not in the game, man!');
    }

    // find out if user is player1 or player2
    let user,
      opp,
      userIsPlayer1;
    if (game.player1Id === userId) {
      user = {
        _id: userId,
        balance: game.player1Balance,
      };
      opp = {
        _id: game.player2Id,
        balance: game.player2Balance,
        name: game.player2Name,
      };
      userIsPlayer1 = true;
    } else {
      user = {
        _id: userId,
        balance: game.player2Balance,
      };
      opp = {
        _id: game.player1Id,
        balance: game.player1Balance,
        name: game.player1Name,
      };
      userIsPlayer1 = false;
    }

    // prüfen, ob bet kleiner als stack ist und größergleich Null
    if (bet < 0 || bet > user.balance) {
      throw new Meteor.Error('you cannot bet less than zero or more than you actually got, bitch');
    }

    // if we are on the client, exist execution here, because bets are stored on
    // the server only
    if (this.isSimulation) {
      return true;
    }

    // ob es schon eine bet gab 1. von diesem aktuellen spieler
    // und vom anderen spieler, und diese danach löschen

    // TODO: remove this
    if (Bets.find().count() > 1) {
      Bets.remove({});
    }

    // {gameId} is ES6 short notation for { gameId: gameId }
    const existingBet = Bets.findOne({ gameId });
    console.log('existing bets: ', Bets.find().count());
    console.log('existingBet: ', existingBet);
    if (!existingBet) {
      // The current user nor the opponent has already placed a bet
      // bet in die bets collection schreiben
      // const newBet = new Bet({
      //   playerId: userId,
      //   bet,
      //   gameId,
      // });
      // newBet.save();
      Bets.insert({
        playerId: userId,
        bet,
        gameId,
      });
      if (userIsPlayer1) {
        game.player1Balance -= bet;
      } else {
        game.player2Balance -= bet;
      }
      game.save();
      console.log('new bet created');
    } else if (existingBet.playerId === opp._id) {
      // opponent has already placed a bet
      // delete current bet in DB
      Bets.remove(existingBet._id);

      // subtract bet from stack first, then calculate winner
      if (userIsPlayer1) {
        game.player1Balance -= bet;
      } else {
        game.player2Balance -= bet;
      }
      game.save();

      // nun dessen bet aus der bets collection lesen und gewinner bestimmen
      const oppBet = existingBet.bet;
      const userBet = bet;
      // calculate winner
      let newStackUser;
      let newStackOpp;

      if (oppBet > userBet) {
        // opp gewinnt und bekommt pot, also die blinds und die bet des Gegners
        // und seine eigene Bet wird noch abgezogen; Nein, da sie bereits
        // abgezogen wurde beim Setzen
        newStackOpp = opp.balance + (2 * game.blind) + userBet;
        newStackUser = user.balance + oppBet;
      } else if (userBet > oppBet) {
        // user gewinnt und bekommt blinds
        newStackOpp = opp.balance + userBet;
        newStackUser = user.balance + (2 * game.blind) + oppBet;
      } else {
        // wenn beide das gleiche gesetzt haben, bekommen beide ihre Einsätze
        // zurück und ihren gesetzten blind
        newStackOpp = opp.balance + game.blind;
        newStackUser = user.balance + game.blind;
      }
      // save the new stacks to DB
      if (userIsPlayer1) {
        game.player1Balance = newStackUser;
        game.player2Balance = newStackOpp;
      } else {
        game.player1Balance = newStackOpp;
        game.player2Balance = newStackUser;
      }
      game.save();
    } else if (existingBet.playerId === userId) {
      // current user has aleady placed a bet
      console.log('aleady placed a bet');
    }

    console.log('the game after all the betting: ',
      JSON.stringify(game, null, 2));

    return true;
  },
});
