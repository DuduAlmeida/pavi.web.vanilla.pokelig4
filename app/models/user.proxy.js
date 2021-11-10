// #region Imports

import 'regenerator-runtime/runtime';
import { environment } from '../environments/environment';

import { httpClient } from '../utils/httpClient';

// #endregion Imports

export class User {

  constructor() {
    this.name = "";
    this.id = '';
    this.ip = null;
    this.pokemon = null;
    this.isPlaying = false;
    this.canUsePrimary = true;
    // this.pokemonName = null; //Pokemon is tracked by it name

    this._getUserIp().then(ip => {
      this.ip = ip;
      this.updateId();
    });
  }

  updateId() {
    if (!this.name) {
      this.id = '';
      return;
    }

    if (!this.ip) {
      this.id = `${this.name.toLocaleLowerCase()}#noip`;
      return;
    }

    this.id = `${this.name.toLocaleLowerCase()}#${this.ip}`;
  }

  fromAnotherObject(obj) {
    if(!!obj){
      this.ip = obj.ip || this.ip;
      this.id = obj.id || this.id;
      this.name = obj.name || this.name;
      this.pokemon = obj.pokemon || this.pokemon;
      this.isPlaying = obj.isPlaying || this.isPlaying;
      this.canUsePrimary = obj.canUsePrimary || this.canUsePrimary;
    }
  }

  async _getUserIp() {

    let data = !environment.isProduction
      ? { ip: 'TESTE_HML' }
      : await httpClient.get('https://jsonip.com/');

    return data.ip || null;
  }  
}