// #region Imports

import { $ } from '../utils/jquery.util';
import { LIST_POKEMONS_MOCKED } from '../environments/environment';
// #endregion Imports

export class ListPokemonComponent {

  constructor() {
    this.listPokemons = Object.values(LIST_POKEMONS_MOCKED);
  }

  insertListIntoHTML(containerReference, parentClassName) {
    const listPokemonCard = this.listPokemons.map(pokemon => {
      return `
      <div class="${parentClassName}__card pkm-card pokemon" pkm-name="${pokemon.name.toLocaleUpperCase()}">
        <div class="${parentClassName}__card__image">
          <img src="${pokemon.imageUrl}" alt="Foto do ${pokemon.name}">
        </div>
      </div>
      `;
    });

    listPokemonCard.forEach(pokemonCard => {
      containerReference.innerHTML += pokemonCard;
    })
  }

}