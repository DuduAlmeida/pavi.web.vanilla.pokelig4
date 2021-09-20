// #region Imports

import 'regenerator-runtime/runtime';

import { $ } from '../../utils/jquery.util';
import { IndexPage } from './index.page';
import { PageBuilderComponent } from '../../components/page-builder.component';
import * as ButtonsEvents from './buttons.events';

// #endregion Imports

// #region OnInit

const pageBuilder = new PageBuilderComponent({
  listLinks: [],
  listScripts: [],
});
const page = new IndexPage();

// #endregion OnInit
