// #region Imports

import 'regenerator-runtime/runtime';

import { $ } from '../../utils/jquery.util';
import { getFromStorage } from '../../utils/storage.util';
import { environment } from '../../environments/environment';
import { ListPokemonComponent } from '../../components/list-pokemon.component';

// #endregion Imports

export class SelectPokemonPage {

	// #region Constructor

	constructor() {
		this.cardContainerReference = $('#pkm-list');
		this.listComponent = new ListPokemonComponent();

		this.fillCardContainer();
		this.validateStorageData();
	}

	// #endregion Constructor

	// #region Public Methods

	fillCardContainer() {
		this.listComponent.insertListIntoHTML(
			this.cardContainerReference,
			'select-pokemon__list'
		);
	}

	// #endregion Public Methods

	// #region Private Methods

	validateStorageData() {
		const userStored = getFromStorage(environment.storageKey.currentUser);

		if (!userStored)
			goToNextPage(environment.slugs.insertName);
	}

	// #endregion Private Methods

}