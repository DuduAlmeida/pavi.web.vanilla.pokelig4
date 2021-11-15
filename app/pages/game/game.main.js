// #region Imports

import 'regenerator-runtime/runtime';

import * as ModalsEvents from './modals.events';
import * as ButtonsEvents from './buttons.events';
import { GamePage } from './game.page';
import { PageBuilderComponent } from '../../components/page-builder.component';
import GameView from './game.view';
import Game from './game';

// #endregion Imports

// #region OnInit

const pageBuilder = new PageBuilderComponent({
  listLinks: [],
  listScripts: [],
});
const page = new GamePage();
const game = new Game();
const gameView = new GameView(document.getElementById("game"));

let user = JSON.parse(localStorage.POKE_LIG4_USER);

console.log(user);

gameView.onTileClick = function(i) {
  game.makeMove(i);
  gameView.update(game);
};

gameView.update(game);

// #endregion OnInit
