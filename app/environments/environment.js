export const environment = {
    url: 'http://localhost:1234/',
    slugs: {
        game: 'game.html',
        home: 'index.html',
        awaitUser: 'await-user.html',
        insertName: 'insert-name.html',
        selectPokemon: 'select-pokemon.html',
    },

    assets: {
        image: '../app/assets/img/',
        pokemon: '../app/assets/img/pokemon/',
    },

    socket: {
        baseUrl: "https://front-br-challenges.web.app/api/v2/",
    }
}

export const LIST_POKEMONS_MOCKED = {
    PIKACHU: {
        id: 1,
        name: 'Pikachu',
        color: '#f4c430',
        alternativeColor: '#fffdd0',
        imageUrl: environment.assets.pokemon + 'pikachu.png',
    },
    CHARMANDER: {
        id: 2,
        name: 'Charmander',
        color: '#b22222',
        alternativeColor: '#de3163',
        imageUrl: environment.assets.pokemon + 'charmander.png',
    },
    BULLBASAUR: {
        id: 3,
        name: 'Bullbasaur',
        color: '#8b008b',
        alternativeColor: '#9acd32',
        imageUrl: environment.assets.pokemon + 'bullbasaur.png',
    },
    WARTORTLE: {
        id: 4,
        name: 'Wartortle',
        color: '#87cefa',
        alternativeColor: '#3db0f7',
        imageUrl: environment.assets.pokemon + 'wartortle.png',
    },
};

Object.freeze(environment);
Object.freeze(LIST_POKEMONS_MOCKED);