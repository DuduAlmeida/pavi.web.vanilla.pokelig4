class User {

  constructor() {
    this.name = "";
    this.ip = null;
    this.id = null;
    this.pokemon = null;
    this.isPlaying = false;
    this.canUsePrimary = true;
  }
  
  updateFromInterface(obj){
    if(!!obj){
      this.ip = obj.ip || this.ip;
      this.id = obj.id || this.id;
      this.name = obj.name || this.name;
      this.pokemon = obj.pokemon || this.pokemon;
      this.isPlaying = obj.isPlaying || this.isPlaying;
      this.canUsePrimary = obj.canUsePrimary || this.canUsePrimary;
    }
  }
}

module.exports = User;