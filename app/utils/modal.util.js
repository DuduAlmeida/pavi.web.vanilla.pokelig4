// #region Imports


import 'regenerator-runtime/runtime';

import { $, $All } from './jquery.util';
import { environment } from '../environments/environment';

// #endregion Imports

export function generateModalEvents(openModal, closeModal) {

  const classToValidateTrigger = 'open';
  const listModalsTriggers = $All(`[${environment.appKey.modalAttr}]`);

  listModalsTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();

      const modal = $(`#${trigger.getAttribute(environment.appKey.modalAttr)}`);

      if (!!Array.from(modal.classList).find(className => className === classToValidateTrigger))
        closeModal(modal);
      else
        openModal(modal);

      const ListCloseModalButton = modal.querySelectorAll('.close-modal');
      ListCloseModalButton.forEach(function (modalToExist) {
        modalToExist.addEventListener('click', function (e) {
          e.preventDefault();

          closeModal(modal);
        });
      });
    });
  });
}