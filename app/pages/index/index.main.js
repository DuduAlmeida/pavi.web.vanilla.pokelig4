// #region Imports

import 'regenerator-runtime/runtime';

// import { $ } from './app/utils/jquery.util';
import { IndexPage } from './index.page';
import { PageBuilderComponent } from '../../components/page-builder.component';
// import * as ButtonEvents from './app/events/buttons.events';
// import * as DropdownEvents from './app/events/dropdown.events';

// import { PetStateEnum } from './app/models/enums/pet-state.enum';
// import { SunStateEnum } from './app/models/enums/sun-state.enum';
// import { WateringcanStateEnum } from './app/models/enums/wateringcan-state.enum';

// #endregion Imports

// #region OnInit

const pageBuilder = new PageBuilderComponent({
  listLinks: [
    "../app/styles/css/index.page.css",
  ],
  listScripts: [ ],
});
const page = new IndexPage();

// #endregion OnInit
