// #region Imports

import 'regenerator-runtime/runtime';

import * as ButtonsEvents from './buttons.events';
import { InsertNamePage } from './insert-name.page';
import { PageBuilderComponent } from '../../components/page-builder.component';

// #endregion Imports

// #region OnInit

const pageBuilder = new PageBuilderComponent({
  listLinks: [],
  listScripts: [],
});

const page = new InsertNamePage();

// #endregion OnInit

