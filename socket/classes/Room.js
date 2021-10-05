class Room {
  constructor(roomId, roomName, namespace, isPrivate = false) {
    this.id = roomId;
    this.name = roomName;
    this.chatHistory = [];
    this.gameHistory = [];
    this.namespace = namespace;
    this.isPrivate = isPrivate;
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

}

module.exports = Room;