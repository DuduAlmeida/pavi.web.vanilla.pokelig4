export class User {

  constructor() {
    this.name = "";
    this.pokemon = null;
    this.isPlaying = false;
    this.ip = null;
    // this._getUserIp().then(ip => {
    //   this.ip = ip;
    //   console.log(this.ip);
    // });
    // this.pokemonName = null; //Pokemon is tracked by it name
  }

  get id() {
    if (!this.name || !this.ip)
      return '';

    return `${this.name.toLocaleLowerCase()}#${this.ip}`;
  }

  async _getUserIp() {
    const data = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
    return data.trim().split('\n').reduce(function (obj, pair) {
      pair = pair.split('=');
      return obj[pair[0]] = pair[1], obj;
    }, {});
  }
}