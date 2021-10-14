// #region Imports

import 'regenerator-runtime/runtime';

import pokeImages from "../assets/img/pokemon/*.png";

// #endregion Imports

export const environment = {
    url: 'http://localhost:1234/',
    isProduction: false,

    appKey: {
        modalAttr: 'modal-id',
    },
    slugs: {
        game: 'game.html',
        home: 'index.html',
        awaitUser: 'await-user.html',
        insertName: 'insert-name.html',
        selectPokemon: 'select-pokemon.html',
    },
    storageKey: {
        currentUser: 'POKE_LIG4_USER',
    },
    assets: {
        image: '../app/assets/img/',
        pokemon: '../app/assets/img/pokemon/',
    },
    socket: {
        baseUrl: "http://localhost:4321",
        gameUrl: "http://localhost:4321/poke",

        roomSlug: "lig4",

        event: {
            countUsers: 'countUsers',
            sendMessage: 'newMessageToServer',
            receiveMessage: 'messageToClients',
            updateChatHistory: 'ChatHistoryCatchUp',
            joinRoom: 'joinRoom',
            loadRoom: 'nsRoomLoad',
        }
    },
}

export const LIST_POKEMONS_MOCKED = {
    PIKACHU: {
        id: 1,
        name: 'Pikachu',
        color: '#f4c430',
        alternativeColor: '#fffdd0',
        imageUrl: pokeImages.pikachu,
    },
    CHARMANDER: {
        id: 2,
        name: 'Charmander',
        color: '#b22222',
        alternativeColor: '#de3163',
        imageUrl: pokeImages.charmander,
    },
    BULLBASAUR: {
        id: 3,
        name: 'Bullbasaur',
        color: '#8b008b',
        alternativeColor: '#9acd32',
        imageUrl: pokeImages.bullbasaur,
    },
    WARTORTLE: {
        id: 4,
        name: 'Wartortle',
        color: '#87cefa',
        alternativeColor: '#3db0f7',
        imageUrl: pokeImages.wartortle,
    },
};

Object.freeze(environment);
Object.freeze(LIST_POKEMONS_MOCKED);