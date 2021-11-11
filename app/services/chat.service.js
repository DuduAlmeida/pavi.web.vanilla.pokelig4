// #region Imports

import { io } from "socket.io-client";

import { $ } from '../utils/jquery.util';
import { environment, LIST_POKEMONS_MOCKED } from "../environments/environment";

// #endregion Imports

export class ChatService {

  // #region Constructor

  constructor(hasToCallMethods = true) {
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

        if (!!hasToCallMethods) {
          this.listenChatHistory('#chat-container');
          this.onGetMessage('#chat-container');
        }
      });
    });
  }

  // #endregion Constructor

  // #region Public Methods

  listenChatHistory(chatContainerQuery) {
    this.socketNamespace.on(environment.socket.event.updateChatHistory, (listChatMessages) => {
      const chatContainerRef = $(chatContainerQuery);
      chatContainerRef.innerHTML = '';

      listChatMessages.forEach((message) => {
        const newMessageHTML = this._buildMessageCardHTML(message)
        chatContainerRef.innerHTML += newMessageHTML;
      });

      chatContainerRef.scrollTo(0, scrollTo.scrollHeight);
    });
  }

  onGetMessage(chatContainerQuery) {
    this.socketNamespace.on(environment.socket.event.receiveMessage, (message) => {
      const newMessageHTML = this._buildMessageCardHTML(message);
      $(chatContainerQuery).innerHTML += newMessageHTML;
    });
  }

  sendMessage(messageText, userId, color, userName, pokemonId) {
    this.socketNamespace.emit(environment.socket.event.sendMessage, {
      userName,
      pokemonId,
      color: color,
      user: userId,
      text: messageText,
    });
  }

  // #endregion Public Methods

  // #region Private Methods

  _buildMessageCardHTML(message) {
    const convertedDate = new Date(message.time).toLocaleString('pt-br').slice(0, -3);

    return `
    <div class="pkm-message" style="background-color:${message.color}">
      <div class="pkm-message__container">
        <div class="pkm-message__container__left">
          <img class="pkm-message__pokemon" src="${LIST_POKEMONS_MOCKED[message.pokemonId].imageUrl}"/>
        </div>
        <div class="pkm-message__container__right">
          <span class="pkm-message__user">${message.userName}</span>
          <span class="pkm-message__text">${message.text}</span>
          <span class="pkm-message__time">${convertedDate}</span>
        </div>
      </div>
    </div>`;
  }

  // #endregion Private Methods
}