// #region Imports

import 'regenerator-runtime/runtime';
import { environment } from '../environments/environment';

// #endregion Imports

export function goToNextPage(pageSlug) {
  window.location.href = (environment.url + pageSlug);
}

export function onReady(fn) {
  document.addEventListener('DOMContentLoaded', fn, false);
}