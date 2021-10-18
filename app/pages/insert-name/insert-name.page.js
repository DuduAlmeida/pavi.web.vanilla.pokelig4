// #region Imports

import 'regenerator-runtime/runtime';

import { $ } from '../../utils/jquery.util';
import { getFromStorage } from '../../utils/storage.util';
import { environment } from '../../environments/environment';

// #endregion Imports

export class InsertNamePage {

  // #region Constructor

  constructor() {
    this.validateStorageData();
    $('#insert-name-input').addEventListener('keyup', (e) => {
      e.preventDefault();

      this.stoppedTyping();
    })
  }

  // #endregion Constructor

  // #region Public Methods

  // #endregion Public Methods

  // #region Private Methods

  validateStorageData() {
    const userStored = getFromStorage(environment.storageKey.currentUser);

    if (!!userStored && !!userStored.name)
      $('#insert-name-input').value = userStored.name;

    this.stoppedTyping();
  }

  stoppedTyping() {
    if (document.getElementById('insert-name-input').value.length > 0) {
      document.getElementById("btn-next-page").disabled = false;
    } else {
      document.getElementById("btn-next-page").disabled = true;
    }
  }

  // #endregion Private Methods

}