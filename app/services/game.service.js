// #region Imports

import { io } from "socket.io-client";

import { $ } from '../utils/jquery.util';
import { environment } from "../environments/environment";

// #endregion Imports

export class GameService {

  // #region Constructor

  constructor() {
    this.countUsersInGame = 0;

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

        this.calculateUsersInGame();
      });
    });
  }

  // #endregion Constructor

  // #region Public Methods

  calculateUsersInGame() {
    this.socketNamespace.on(environment.socket.event.countUsersInGame, (doubleOfUsersInGame) => {
      this.countUsersInGame = (doubleOfUsersInGame / 2);
      console.log('Count users in game:', this.countUsersInGame);
    });
  }

  // #endregion Public Methods

  // #region Private Methods



  // #endregion Private Methods
}