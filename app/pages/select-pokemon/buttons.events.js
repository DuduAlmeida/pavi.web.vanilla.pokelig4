// #region Imports

import 'regenerator-runtime/runtime';
import { $ } from '../../utils/jquery.util';
import { environment } from '../../environments/environment';
import { onReady, goToNextPage } from '../../utils/page.util';

// #endregion Imports

onReady(() => {
  $('#pokemon').addEventListener('click', (e) => {
    e.preventDefault();

    console.log(e);

    goToNextPage(environment.slugs.awaitUser);
  });
})
