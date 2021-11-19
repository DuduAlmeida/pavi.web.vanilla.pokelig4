// #region Imports

import 'regenerator-runtime/runtime';

import { $ } from '../../utils/jquery.util';
import { ChatService } from '../../services/chat.service';
import { GameService } from '../../services/game.service';
import { getFromStorage } from '../../utils/storage.util';
import { environment } from '../../environments/environment';

// #endregion Imports

export class GamePage {

	// #region Constructor

	constructor() {
		this.user = null;
		this.chatFormQuery = '#chat-form';
		this.chatInputQuery = '#chat-input';
		this.chatContainerQuery = '#chat-container';
		this.chatService = new ChatService();
		this.gameService = new GameService(
			false,
			'#game',
			'.game-header-turn',
			'.game__header__status',
		);

		this._validateStorageData();
		this._listenChatForm(this.chatFormQuery);
	}

	// #endregion Constructor

	// #region Public Methods

	onSendMessage = (e) => {
		e.preventDefault();

		const messageText = $('#chat-input').value;
		$('#chat-input').value = '';

		this.chatService.sendMessage(
			messageText,
			this.user.id,
			!!this.user.canUsePrimary ? this.user.pokemon.color : this.user.pokemon.alternativeColor,
			this.user.name,
			this.user.pokemon.name.toLocaleUpperCase(),
		)
	}

	// #endregion Public Methods

	// #region Private Methods

	_validateStorageData = () => {
		this.user = getFromStorage(environment.storageKey.currentUser);

		if (!this.user)
			goToNextPage(environment.slugs.insertName);
	}

	_listenChatForm(chatFormQuery) {
		$(chatFormQuery).addEventListener('submit', this.onSendMessage);
	}

	// #endregion Private Methods

}
