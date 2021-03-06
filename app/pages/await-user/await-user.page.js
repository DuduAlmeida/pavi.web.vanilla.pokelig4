// #region Imports

import 'regenerator-runtime/runtime';

import { $ } from '../../utils/jquery.util';
import { ChatService } from '../../services/chat.service';
import { GameService } from '../../services/game.service';
import { getFromStorage } from '../../utils/storage.util';
import { environment } from '../../environments/environment';

// #endregion Imports

export class AwaitUserPage {

	// #region Constructor

	constructor() {
		this.gameService = new GameService(true);
		this.chatService = new ChatService(false);
		this.validateStorageData();
	}

	// #endregion Constructor

	// #region Public Methods

	// #endregion Public Methods

	// #region Private Methods

	validateStorageData() {
		const userStored = getFromStorage(environment.storageKey.currentUser);

		if (!userStored)
			goToNextPage(environment.slugs.insertName);
	}

	// #endregion Private Methods

}