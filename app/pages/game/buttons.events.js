// #region Imports

import 'regenerator-runtime/runtime';
import { $, $All } from '../../utils/jquery.util';
import { onReady, goToNextPage } from '../../utils/page.util';
import { setIntoStorage, getFromStorage } from '../../utils/storage.util';
import { environment, LIST_POKEMONS_MOCKED } from '../../environments/environment';

// #endregion Imports

onReady(() => {
  $('#backButton').addEventListener('click', (e) => {
    e.preventDefault();

  });
})
