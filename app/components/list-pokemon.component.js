// #region Imports

import { $ } from '../utils/jquery.util';
import { LIST_POKEMONS_MOCKED } from '../environments/environment';
// #endregion Imports

export class ListPokemonComponent {

  constructor() {
    this.listPokemons = Object.values(LIST_POKEMONS_MOCKED);
  }

  insertListIntoHTML(containerReference) {
    console.log('containerReference: ', containerReference);
    const listPokemonCard = this.listPokemons.map(pokemon => {
      return `
      <div id="pokemon" class="select-pokemon__card pkm-card">
        <div class="select-pokemon__card__image">
          <img src="${pokemon.imageUrl}" alt="Foto do ${pokemon.name}">
        </div>
      </div>
      `;
    });

    console.log('listPokemonCard: ', listPokemonCard);
    listPokemonCard.forEach(pokemonCard => {
      containerReference.innerHTML += pokemonCard;
    })
  }

}