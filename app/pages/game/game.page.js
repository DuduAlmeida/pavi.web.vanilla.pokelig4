// #region Imports

import 'regenerator-runtime/runtime';

import { $ } from '../../utils/jquery.util';
import { getFromStorage } from '../../utils/storage.util';
import { environment } from '../../environments/environment';

// #endregion Imports

export class GamePage {

	// #region Constructor

	constructor() {

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