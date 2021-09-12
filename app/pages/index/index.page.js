// #region Imports

import 'regenerator-runtime/runtime';

import { GreenThumbService } from './services/greenThumb.service';
import { PlantCardComponent } from './components/plant-card.component';
import { $ } from './utils/jquery.util';

// #endregion Imports

export class IndexPage {

    // #region Constructor

    constructor() {
        this._listPlantsCards = new PlantCardComponent($('#list-plants'));
    }

    // #endregion Constructor

    // #region Public Methods

    async loadGreenThumb(sunState, waterState, petState) {
        const [isSuccess, response] = await GreenThumbService.getManyGreenThumb(sunState, waterState, petState);

        console.log('Requisição: ', isSuccess, response);

        if (!isSuccess) {
            this._listPlantsCards.update([''])
            this._onGetPlants(!!isSuccess);
            return;
        }

        this._onGetPlants(!!isSuccess);
        this._listPlantsCards.update(response);
    }

    // #endregion Public Methods

    // #region Private Methods

    /***
     * Método chamado ao receber as plantas
     * 
     * @param isSuccess Diz se trouxe as plantas com sucesso
     */
    _onGetPlants(isSuccess) {
        if (!isSuccess) {

            $('#plants-empty').classList.remove('d-none');
            $('#plants-container').classList.add('d-none');
            return;
        }

        $('#plants-empty').classList.add('d-none');
        $('#plants-container').classList.remove('d-none')
    }

    // #endregion Private Methods

}