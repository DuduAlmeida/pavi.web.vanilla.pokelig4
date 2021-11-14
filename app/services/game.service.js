// #region Imports

import { io } from "socket.io-client";

import { $ } from '../utils/jquery.util';
import { User } from '../models/user.proxy';
import { goToNextPage } from '../utils/page.util';
import { environment } from "../environments/environment";
import { getFromStorage, setIntoStorage } from '../utils/storage.util';

// #endregion Imports

export class GameService {

  // #region Constructor

  constructor(hasToGoToGameWhenValid = false) {
    this.board = [];
    this.user = null;
    this.listPlayers = [];
    this.countUsersInGame = 0;
    this.hasToGoToGameWhenValid = hasToGoToGameWhenValid;

    this._validateStorageData();

    const socket = io(environment.socket.baseUrl, {
      withCredentials: true,
      extraHeaders: {
        'Access-Control-Allow-Origin': '*',
      }
    });

    socket.on('nsList', (ns) => {
      if (!!this.socketNamespace)
        this.socketNamespace.close();
      this.socketNamespace = io(environment.socket.gameUrl, {
        withCredentials: true,
        extraHeaders: {
          'Access-Control-Allow-Origin': '*',
        }
      });

      this.socketNamespace.on(environment.socket.event.loadRoom, (listRooms) => {
        this.socketNamespace.emit(environment.socket.event.joinRoom, environment.socket.roomSlug);

        this.getUsersInGame();
        this.addUserInGame();
        this.closeGame();
      });
    });
  }

  // #endregion Constructor

  // #region Public Methods

  getUsersInGame() {
    this.socketNamespace.on(environment.socket.event.getListPlayers, (listPlayers) => {
      this._updateUserInStorage(listPlayers);

      // console.log(listPlayers, this.user);
      if (!!this.hasToGoToGameWhenValid && !!this.user && !!listPlayers) {

        if (listPlayers.length >= 2 && this._hasUserInList(listPlayers)) {
          goToNextPage(environment.slugs.game);
        }
      }
    });
  }

  addUserInGame() {
    if (!!this.hasToGoToGameWhenValid && !!this.user) {
      this.socketNamespace.emit(environment.socket.event.addPlayerIntoServer, this.user);
    }
  }

  closeGame() {
    window.onunload = function (e) {
      console.log('Chamou');
      if (!!this.user) {
        this.socketNamespace.emit(environment.socket.event.removePlayerInServer, this.user);
      }
    };
  }

  checkIfHasWinner() {
    this.socketNamespace.emit(environment.socket.event.verifyWinner, this.board, ...this._getUsersId);
  }

  // #endregion Public Methods

  // #region Private Methods

  _validateStorageData = () => {
    this.user = getFromStorage(environment.storageKey.currentUser);

    if (!this.user)
      goToNextPage(environment.slugs.insertName);
  }

  _findUserInList(listUsers) {
    return listUsers.find(player => player.id == this.user.id);
  }

  _hasUserInList(listUsers) {
    return !!this._findUserInList(listUsers);
  }

  _updateUserInStorage(listUsers) {
    let userStored = new User();
    const userSocket = this._findUserInList(listUsers);

    if (!userSocket) return;

    userStored.fromAnotherObject(userSocket);
    setIntoStorage(environment.storageKey.currentUser, userStored);
    this.user = userStored;
    this.listPlayers = listUsers;
  }

  _getUsersId() {
    return this.listPlayers.map(player => player.id);
  }

  // #endregion Private Methods
}