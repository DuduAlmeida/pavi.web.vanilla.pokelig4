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

  constructor(hasToGoToGameWhenValid = false, gameQuery = '', turnQuery = '', statusQuery = '') {
    this.user = null;
    this.listPlayers = [];
    this.countUsersInGame = 0;
    this.board = new Array(42).fill(null);
    this.hasToGoToGameWhenValid = hasToGoToGameWhenValid;

    this.gameQuery = gameQuery;
    this.turnQuery = turnQuery;
    this.statusQuery = statusQuery;

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

        if (!this.hasToGoToGameWhenValid) {
          this.prepareBoardGame(this.gameQuery, this.statusQuery, this.turnQuery)
        }
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
      this._closeGameAtSocket();
    };
  }

  makeMove(gameIndex) {
    if (!gameIndex) return;

    this.socketNamespace.emit(environment.socket.event.gameMakeMove, {
      gameIndex,
      playerId: this.user.id,
      pokemon: this.user.pokemon,
      canUsePrimary: this.user.canUsePrimary,
    });
  }

  prepareBoardGame(gameQuery, statusQuery, turnQuery) {
    this._buildGameBoardHTML(gameQuery);
    this.updateTurn(turnQuery);
    this.updateBoard(gameQuery);
    this.updateStatus(statusQuery);
    this._updateGameBoardHTML(gameQuery);

    $(gameQuery).querySelectorAll(".board-tile").forEach(cell => {
      cell.addEventListener("click", () => {
        this.onCellClick(cell.dataset.index);
      });
    });
  }

  onCellClick(cellIndex) {
    this.makeMove(cellIndex);
  }

  updateStatus(statusQuery) {
    this.statusQuery = statusQuery;

    this.socketNamespace.on(environment.socket.event.getGameStatus, (gameStatus) => {
      $(this.statusQuery).innerHTML = gameStatus;
    });
  }

  updateTurn(turnQuery) {
    this.turnQuery = turnQuery;

    this.socketNamespace.on(environment.socket.event.getGameTurn, (gameTurn) => {
      $(this.turnQuery).innerHTML = gameTurn;
    });
  }

  updateBoard(gameQuery) {
    this.gameQuery = gameQuery;

    this.socketNamespace.on(environment.socket.event.getGameBoard, (gameBoard) => {
      this.board = gameBoard;
      this._updateGameBoardHTML(this.gameQuery);
    });
  }

  // #endregion Public Methods

  // #region Private Methods

  _validateStorageData = () => {
    this.user = getFromStorage(environment.storageKey.currentUser);

    if (!this.user)
      goToNextPage(environment.slugs.insertName);
  }

  _findUserInList(listUsers, userIdToFind = this.user.id) {
    return listUsers.find(player => player.id == userIdToFind);
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

  _closeGameAtSocket() {
    if (!!this.user) {
      this.socketNamespace.emit(environment.socket.event.removePlayerInServer, this.user);
    }
  }

  _updateGameBoardHTML(gameQuery) {
    for (let i = 0; i < this.board.length; i++) {
      const tile = $(gameQuery).querySelector(`.board-tile[data-index="${i}"]`);
      const color = !!this.board[i]
        ? (!!this.board[i].canUsePrimary ? this.board[i].pokemon.color : this.board[i].pokemon.alternativeColor)
        : 'transparent';

      tile.innerHTML = !!this.board[i]
        ? `<div class="pokemon-cell" style="background-color: ${color}"><img src="${this.board[i].pokemon.imageUrl}" /></div>`
        : this.board[i];
    }
  }

  _buildGameBoardHTML(gameQuery) {
    this.root = $(gameQuery);
    this.root.innerHTML = `
            <div class="game-header">
                <div class="game-header-turn">
                    Player 1's turn
                </div>
            </div>
            <div class="board">
                <div class="board-tile" data-index="0"></div>
                <div class="board-tile" data-index="1"></div>
                <div class="board-tile" data-index="2"></div>
                <div class="board-tile" data-index="3"></div>
                <div class="board-tile" data-index="4"></div>
                <div class="board-tile" data-index="5"></div>
                <div class="board-tile" data-index="6"></div>
                <div class="board-tile" data-index="7"></div>
                <div class="board-tile" data-index="8"></div>
                <div class="board-tile" data-index="9"></div>
                <div class="board-tile" data-index="10"></div>
                <div class="board-tile" data-index="11"></div>
                <div class="board-tile" data-index="12"></div>
                <div class="board-tile" data-index="13"></div>
                <div class="board-tile" data-index="14"></div>
                <div class="board-tile" data-index="15"></div>
                <div class="board-tile" data-index="16"></div>
                <div class="board-tile" data-index="17"></div>
                <div class="board-tile" data-index="18"></div> 
                <div class="board-tile" data-index="19"></div>
                <div class="board-tile" data-index="20"></div>
                <div class="board-tile" data-index="21"></div>
                <div class="board-tile" data-index="22"></div>
                <div class="board-tile" data-index="23"></div>
                <div class="board-tile" data-index="24"></div>
                <div class="board-tile" data-index="25"></div>
                <div class="board-tile" data-index="26"></div>
                <div class="board-tile" data-index="27"></div>
                <div class="board-tile" data-index="28"></div>
                <div class="board-tile" data-index="29"></div>
                <div class="board-tile" data-index="30"></div>
                <div class="board-tile" data-index="31"></div>
                <div class="board-tile" data-index="32"></div>
                <div class="board-tile" data-index="33"></div>
                <div class="board-tile" data-index="34"></div>
                <div class="board-tile" data-index="35"></div>
                <div class="board-tile" data-index="36"></div>
                <div class="board-tile" data-index="37"></div>
                <div class="board-tile" data-index="38"></div>
                <div class="board-tile" data-index="39"></div>
                <div class="board-tile" data-index="40"></div>
                <div class="board-tile" data-index="41"></div>
            </div>
        `;
  }


  // #endregion Private Methods
}