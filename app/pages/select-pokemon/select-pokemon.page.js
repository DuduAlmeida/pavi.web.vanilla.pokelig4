// #region Imports

import 'regenerator-runtime/runtime';

import { $ } from '../../utils/jquery.util';
import { ListPokemonComponent } from '../../components/list-pokemon.component';

// #endregion Imports

export class SelectPokemonPage {

	// #region Constructor

	constructor() {
		this.cardContainerReference = $('#pkm-list');
		this.listComponent = new ListPokemonComponent();

		this.fillCardContainer();
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



	// #endregion Private Methods

}