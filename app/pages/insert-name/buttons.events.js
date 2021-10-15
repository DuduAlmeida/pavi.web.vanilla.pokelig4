import 'regenerator-runtime/runtime';
import { environment } from '../../environments/environment';
import { $, $All } from '../../utils/jquery.util';
import { onReady, goToNextPage } from '../../utils/page.util';
import { setIntoStorage, getFromStorage } from '../../utils/storage.util';

onReady(() => {
    $('#btn-next-page').addEventListener('click', (e) => {
        e.preventDefault();

        let userStored = {};

        if(getFromStorage(environment.storageKey.currentUser) !== null) {
            userStored = getFromStorage(environment.storageKey.currentUser);
        }

        userStored.name = document.getElementById('insert-name-input').value;
        setIntoStorage(environment.storageKey.currentUser, userStored);

        goToNextPage(environment.slugs.selectPokemon);
    });
  })