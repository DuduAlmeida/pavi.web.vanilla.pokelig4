class Namespace {
  constructor(id, name, endpoint) {
    this.id = id;
    this.rooms = [];
    this.name = name;
    this.endpoint = endpoint;
  }
  addRoom(roomObj) {
    this.rooms.push(roomObj);
  }
}

module.exports = Namespace;