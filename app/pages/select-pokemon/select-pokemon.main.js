// #region Imports

import 'regenerator-runtime/runtime';

import { $ } from '../../utils/jquery.util';
import { SelectPokemonPage } from './select-pokemon.page';
import { PageBuilderComponent } from '../../components/page-builder.component';
import * as ButtonsEvents from './buttons.events';

// #endregion Imports

// #region OnInit

const pageBuilder = new PageBuilderComponent({
  listLinks: [],
  listScripts: [],
});
const page = new SelectPokemonPage();

// #endregion OnInit
