function isValid(item){
  return item !== undefined && item !== null;
}

class User {

  constructor() {
    this.ip = null;
    this.id = null;
    this.name = "";
    this.pokemon = null;
    this.isPlaying = false;
    this.canUsePrimary = true;
  }
  
  updateFromInterface(obj){
    if(!!obj){
      this.ip = isValid(obj.ip) ? obj.ip : this.ip;
      this.id = isValid(obj.id) ? obj.id : this.id;
      this.name = isValid(obj.name) ? obj.name : this.name;
      this.pokemon = isValid(obj.pokemon) ? obj.pokemon : this.pokemon;
      this.isPlaying = isValid(obj.isPlaying) ? obj.isPlaying : this.isPlaying;
      this.canUsePrimary = isValid(obj.canUsePrimary) ? obj.canUsePrimary : this.canUsePrimary;
    }
  }
}

module.exports = User;