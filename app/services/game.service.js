// #region Imports

import { io } from "socket.io-client";

import { $ } from '../utils/jquery.util';
import { goToNextPage } from '../utils/page.util';
import { getFromStorage } from '../utils/storage.util';
import { environment } from "../environments/environment";

// #endregion Imports

export class GameService {

  // #region Constructor

  constructor(hasToGoToGameWhenValid = false) {
    this.user = null;
    this.hasToGoToGameWhenValid = hasToGoToGameWhenValid;
    this.countUsersInGame = 0;

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
      });
    });
  }

  // #endregion Constructor

  // #region Public Methods

  getUsersInGame() {
    this.socketNamespace.on(environment.socket.event.getListPlayers, (listPlayers) => {

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

  // #endregion Public Methods

  // #region Private Methods

  _validateStorageData = () => {
    this.user = getFromStorage(environment.storageKey.currentUser);

    if (!this.user)
      goToNextPage(environment.slugs.insertName);
  }

  _hasUserInList(listUsers) {
    return !!listUsers.find(player => player.id == this.user.id)
  }

  // #endregion Private Methods
}