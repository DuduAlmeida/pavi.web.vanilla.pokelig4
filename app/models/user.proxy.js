// #region Imports

import 'regenerator-runtime/runtime';
import { environment } from '../environments/environment';

import { httpClient } from '../utils/httpClient';

// #endregion Imports

export class User {

  constructor() {
    this.name = "";
    this.ip = null;
    this.pokemon = null;
    this.isPlaying = false;
    this.canUsePrimary = true;
    // this.pokemonName = null; //Pokemon is tracked by it name

    this._getUserIp().then(ip => {
      this.ip = ip;
    });
  }

  get id() {
    if (!this.name)
      return '';

    if (!this.ip)
      return `${this.name.toLocaleLowerCase()}#noip`;

    return `${this.name.toLocaleLowerCase()}#${this.ip}`;
  }

  async _getUserIp() {

    let data = !environment.isProduction
      ? { ip: 'TESTE_HML' }
      : await httpClient.get('https://jsonip.com/');

    return data.ip || null;
  }
}