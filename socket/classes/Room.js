const Game = require("./Game");

class Room {
  constructor(roomId, roomName, namespace, isPrivate = false) {
    this.users = [];
    this.id = roomId;
    this.name = roomName;
    this.chatHistory = [];
    this.game = new Game();
    this.namespace = namespace;
    this.isPrivate = isPrivate;
  }

  addUser(user) {
    const hasSamePokemon = !!this.findUserWithSamePokemon(user);
    console.log('User: ', user.name, hasSamePokemon);
    user.canUsePrimary = !hasSamePokemon;
    this.users.push(user);
  }

  removeUser(user) {
    const index = this.findUserIndex(user);

    this.users = [...this.users.slice(0, index), ...this.users.slice(index + 1)];
  }

  addMessage(message) {
    this.chatHistory.push(message);
  }

  addGamePlay(gamePlay) {
    this.gameHistory.push(gamePlay);
  }

  clearHistories() {
    this.clearChatHistory();
    this.clearGameHistory();
  }

  clearChatHistory() {
    this.chatHistory = [];
  }

  clearGameHistory() {
    this.chatHistory = [];
  }

  findUser(userFinded) {
    return this.users.find(user => user.id === userFinded.id);
  }

  findUserWithSamePokemon(userFinded) {
    return this.users.find(user => user.pokemon.id === userFinded.pokemon.id);
  }

  findUserIndex(userFinded) {
    return this.users.findIndex(user => user.id === userFinded.id);
  }

}

module.exports = Room;