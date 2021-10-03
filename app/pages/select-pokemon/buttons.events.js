// #region Imports

import 'regenerator-runtime/runtime';
import { $, $All } from '../../utils/jquery.util';
import { onReady, goToNextPage } from '../../utils/page.util';
import { setIntoStorage, getFromStorage } from '../../utils/storage.util';
import { environment, LIST_POKEMONS_MOCKED } from '../../environments/environment';

// #endregion Imports

onReady(() => {
  $All('.pokemon').forEach(pokemonContainer => {
    pokemonContainer.addEventListener('click', (e) => {
      e.preventDefault();

      const selectedPokemon = pokemonContainer.getAttribute('pkm-name');
      let userStored = getFromStorage(environment.storageKey.currentUser);
      userStored.pokemon = LIST_POKEMONS_MOCKED[selectedPokemon];

      setIntoStorage(environment.storageKey.currentUser, userStored);

      goToNextPage(environment.slugs.awaitUser);
    });
  });

  $('#backButton').addEventListener('click', (e) => {
    e.preventDefault();

    goToNextPage(environment.slugs.insertName);
  });
})
