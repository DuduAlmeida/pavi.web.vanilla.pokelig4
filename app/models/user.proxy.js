// #region Imports

import 'regenerator-runtime/runtime';

import { httpClient } from '../utils/httpClient';

// #endregion Imports

export class User {

  constructor() {
    this.name = "";
    this.ip = null;
    this.pokemon = null;
    this.isPlaying = false;
    // this.pokemonName = null; //Pokemon is tracked by it name

    this._getUserIp().then(ip => {
      this.ip = ip;
    });
  }

  get id() {
    if (!this.name || !this.ip)
      return '';

    return `${this.name.toLocaleLowerCase()}#${this.ip}`;
  }

  async _getUserIp() {
    let data = await httpClient.get('https://jsonip.com/');

    return data.ip || null;
  }
}