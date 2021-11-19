// #region Imports

import 'regenerator-runtime/runtime';

import * as ModalsEvents from './modals.events';
import * as ButtonsEvents from './buttons.events';
import { GamePage } from './game.page';
import { PageBuilderComponent } from '../../components/page-builder.component';

// #endregion Imports

// #region OnInit

const pageBuilder = new PageBuilderComponent({
  listLinks: [],
  listScripts: [],
});
const page = new GamePage();

// #endregion OnInit
