import 'regenerator-runtime/runtime';
import {User} from '../../models/user.proxy';
import { environment } from '../../environments/environment';
import { $, $All } from '../../utils/jquery.util';
import { onReady, goToNextPage } from '../../utils/page.util';
import { setIntoStorage, getFromStorage } from '../../utils/storage.util';

onReady(() => {
    $('#btn-next-page').addEventListener('click', (e) => {
        e.preventDefault();

        let userStored = new User();

        if(getFromStorage(environment.storageKey.currentUser) !== null) {
            userStored.fromAnotherObject(getFromStorage(environment.storageKey.currentUser));
        }

        userStored.name = document.getElementById('insert-name-input').value;
        userStored.updateId();
        setIntoStorage(environment.storageKey.currentUser, userStored);

        goToNextPage(environment.slugs.selectPokemon);
    });
  })