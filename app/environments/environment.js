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
            joinRoom: 'joinRoom',
            loadRoom: 'nsRoomLoad',
            countUsers: 'countUsers',
            gameMakeMove: 'makeMove',
            getGameTurn: 'getGameTurn',
            getGameBoard: 'getGameBoard',
            getListPlayers: 'listPlayers',
            countUsersInGame: 'countUsers',
            getGameStatus: 'getGameStatus',
            sendMessage: 'newMessageToServer',
            receiveMessage: 'messageToClients',
            updateChatHistory: 'ChatHistoryCatchUp',
            addPlayerIntoServer: 'addPlayerIntoServer',
            removePlayerInServer: 'removePlayerInServer',
            endGame: 'endGame',
        }
    },
}

export const LIST_POKEMONS_MOCKED = {
    PIKACHU: {
        id: 1,
        name: 'Pikachu',
        color: '#f4c430',
        alternativeColor: '#ffaa00',
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
        color: '#0e4bef',
        alternativeColor: '#3db0f7',
        imageUrl: pokeImages.wartortle,
    },
};

Object.freeze(environment);
Object.freeze(LIST_POKEMONS_MOCKED);