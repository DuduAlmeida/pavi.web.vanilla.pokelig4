// #region Imports

import { $ } from '../utils/jquery.util';
import { validateArray } from '../utils/validate.util';

// #endregion Imports

export class PageBuilderComponent {

  /***
   * Receives {listLinks: string[], listScripts: string[]}
   */
  constructor(data) {
    this._listLinks = !!data && validateArray(data.listLinks) ? data.listLinks : [];
    this._listScripts = !!data && validateArray(data.listScripts) ? data.listScripts : [];

    this.updatePageHeader();
    this.updatePageBody();
  }

  updatePageHeader() {
    let headerReference = $('head');
    headerReference.innerHTML = `
      <title>Poké Lig4</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />

      <link rel="icon" href="https://cdn.cdnlogo.com/logos/p/74/pokemon.svg">
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
    `;

    headerReference.innerHTML += this._listLinks.map(itemLink => `<link rel="stylesheet" href="${itemLink}"/>`);
  }

  updatePageBody() {
    let bodyReference = $('body');

    bodyReference.innerHTML += this._listScripts.map(itemScript => `<script src="${itemScript}"></script>`);
  }

}
