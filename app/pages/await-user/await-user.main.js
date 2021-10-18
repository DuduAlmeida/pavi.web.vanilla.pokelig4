// #region Imports

import 'regenerator-runtime/runtime';

import { $ } from '../../utils/jquery.util';
import { onReady } from '../../utils/page.util';
import * as ButtonsEvents from './buttons.events';
import { AwaitUserPage } from './await-user.page';
import { PageBuilderComponent } from '../../components/page-builder.component';

// #endregion Imports

// #region OnInit

const pageBuilder = new PageBuilderComponent({
  listLinks: [],
  listScripts: [],
});
const page = new AwaitUserPage();

// #endregion OnInit
