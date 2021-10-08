// #region Imports

const Namespace = require('../classes/Namespace');
const Room = require('../classes/Room');

// #endregion Imports

let listNamespaces = [];

let gameNs = new Namespace(7, 'poke', '/poke');

gameNs.addRoom(new Room(1, 'lig4', 'Poke'));

module.exports = listNamespaces;