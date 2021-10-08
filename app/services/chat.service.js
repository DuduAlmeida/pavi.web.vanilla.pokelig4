// #region Imports

import { io } from "socket.io-client";

import { $ } from '../utils/jquery.util';
import { environment } from "../environments/environment";

// #endregion Imports

export class ChatService {

  // #region Constructor

  constructor() {
    this.socketNamespace = io(environment.socket.gameUrl);
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

  sendMessage(messageText, userId, color) {
    this.socketNamespace.emit(environment.socket.event.sendMessage, {
      user: userId,
      color: color,
      text: messageText,
    });
  }

  // #endregion Public Methods

  // #region Private Methods

  _buildMessageCardHTML(message) {
    const convertedDate = new Date(message.time).toLocaleString();

    return `
    <div class="pkm-message" style="background-color:${message.color}">
      <span class="pkm-message__text">${message.text}</span>
      <span class="pkm-message__time">${convertedDate}</span>
    </div>`;
  }

  // #endregion Private Methods
}