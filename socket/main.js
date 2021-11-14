// #region Imports

const express = require('express');
const cors = require('cors')
const app = express();
const socketio = require('socket.io');
const User = require('./classes/User');

let listNamespaces = require('./data/poke.namespace');

// #endregion Imports

// #region Settings

app.use(cors());

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/home.html');
});

const expressServer = app.listen(4321);
const io = new socketio.Server(expressServer, {
	cors: {
		origin: "http://localhost:1234",
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Access-Control-Allow-Origin"],
		credentials: true,
	}
});

// #endregion Settings

// #region OnStart Application

io.on('connection', (socket) => {
	const nsData = listNamespaces.map((ns) => {
		return {
			endpoint: ns.endpoint
		}
	});

	socket.emit('nsList', nsData);
})

listNamespaces.forEach((namespace) => {
	io.of(namespace.endpoint).on('connection', (nsSocket) => {

		// #region OnConnection

		console.log(`${nsSocket.id} has join ${namespace.endpoint}`);
		nsSocket.emit('nsRoomLoad', namespace.rooms);
		io.of(namespace.endpoint).to(namespace.rooms[0].name).emit('listPlayers', namespace.rooms[0].users);

		// #endregion OnConnection

		// #region OnJoinRoom

		nsSocket.on('joinRoom', (roomToJoin) => {

			const roomToLeave = Object.keys(nsSocket.rooms)[1];

			nsSocket.leave(roomToLeave);
			updateUsersLengthInRoom(namespace, roomToLeave);
			nsSocket.join(roomToJoin);

			const nsRoom = namespace.rooms.find((room) => {
				return room.name === roomToJoin;
			});

			nsSocket.emit('ChatHistoryCatchUp', nsRoom.chatHistory);
			nsSocket.emit('GameHistoryCatchUp', nsRoom.gameHistory);
			updateUsersLengthInRoom(namespace, roomToJoin);
			io.of(namespace.endpoint).to(nsRoom.name).emit('listPlayers', nsRoom.users);
		});

		// #endregion OnJoinRoom

		// #region OnNewMessageToServer

		nsSocket.on('newMessageToServer', (msg) => {
			console.log(msg);
			const fullMsg = {
				text: msg.text,
				user: msg.user,
				time: Date.now(),
				color: msg.color,
				userName: msg.userName,
				pokemonId: msg.pokemonId,
			}

			const nsRoom = namespace.rooms[0];
			const roomName = nsRoom.name;


			nsRoom.addMessage(fullMsg);
			io.of(namespace.endpoint).to(roomName).emit('messageToClients', fullMsg);
		});

		// #endregion OnNewMessageToServer

		// #region Add Or Remove Player

		nsSocket.on('addPlayerIntoServer', (player) => {
			let user = new User();
			user.updateFromInterface(player);

			const nsRoom = namespace.rooms[0];
			const roomName = nsRoom.name;

			if (!nsRoom.findUser(user)) {
				nsRoom.addUser(user);
			}

			io.of(namespace.endpoint).to(roomName).emit('listPlayers', nsRoom.users);
		});

		nsSocket.on('removePlayerInServer', (player) => {
			let user = new User();
			user.updateFromInterface(player);

			const nsRoom = namespace.rooms[0];
			const roomName = nsRoom.name;

			if (!!nsRoom.findUser(user)) {
				nsRoom.removeUser(user);
			}

			console.log('Chamou pra remover');
			io.of(namespace.endpoint).to(roomName).emit('listPlayers', nsRoom.users);
		});

		// #endregion Add Or Remove Player
	})
});

function updateUsersLengthInRoom(namespace, roomToJoin) {
	let clients = io.of(namespace.endpoint).sockets;
	clients = Array.from(clients);

	io.of(namespace.endpoint).in(roomToJoin).emit('countUsers', Object.keys(clients).length)
}

// #endregion OnStart Application

// #region Verify Winner
nsSocket.on('verifyWinner', (board, player1Id, player2Id) => {
	let winner = '';
	let linePlayer1 = [];
	let linePlayer2 = [];
	let columnPlayer1 = [];
	let columnPlayer2 = [];

	// #region Play Mapping
	board.map((lines, lineIndex) => {
		lines.map((columns, columnIndex) => {
			if (columns === player1Id) {
				linePlayer1.push(lineIndex)
				columnPlayer1.push(columnIndex)
			} else if (columns === player2Id) {
				linePlayer2.push(lineIndex)
				columnPlayer2.push(columnIndex)
			}
		})
	})
	// #endregion Play Mapping

	//horizontal
	const horizontalPlayer1 = verify(linePlayer1, columnPlayer1, 'hv')
	const horizontalPlayer2 = verify(linePlayer2, columnPlayer2, 'hv')

	//vertical
	const verticalPlayer1 = verify(columnPlayer1, linePlayer1, 'hv')
	const verticalPlayer2 = verify(columnPlayer2, linePlayer2, 'hv')

	//right diagonal
	const rightDiagonalPlayer1 = verify(linePlayer1, columnPlayer1, 'rd')
	const rightDiagonalPlayer2 = verify(linePlayer2, columnPlayer2, 'rd')

	//left diagonal
	const leftDiagonalPlayer1 = verify(linePlayer1, columnPlayer1, 'ld')
	const leftDiagonalPlayer2 = verify(linePlayer2, columnPlayer2, 'ld')

	//check if there was a winner
	if (horizontalPlayer1 >= 4 || verticalPlayer1 >= 4 || rightDiagonalPlayer1 >= 4 || leftDiagonalPlayer1 >= 4) {
		winner = player1Id
	} else if (horizontalPlayer2 >= 4 || verticalPlayer2 >= 4 || rightDiagonalPlayer2 >= 4 || leftDiagonalPlayer2 >= 4) {
		winner = player2Id
	}

	// Falta o Return - Tirar dúvida com o Du
	if (!!winner) {
		io.of(namespace.endpoint).to(roomName).emit('onGetWinner', ({
			hasWinner: !!winner,
			winner: winner,
		}));
	}
})

function verify(mainAxis, auxAxis, direction) {
	var qt = 1
	var last = 0

	for (var i = 0; i < mainAxis.length; i++) {
		//horizontal and vertical
		if (direction === 'hv') {
			last = i
			for (var j = 0; j < mainAxis.length; j++) {
				if (qt < 4) {
					if ((mainAxis[j] == mainAxis[last] + 1) && (auxAxis[j] == auxAxis[last])) {
						last = j
						qt++
					}
				} else {
					return qt
				}
			}
			if (qt < 4) {
				qt = 1
			} else {
				return qt
			}
		}

		//right diagonal
		else if (direction === 'rd') {
			last = i
			for (var j = 0; j < mainAxis.length; j++) {
				if (qt < 4) {
					if ((mainAxis[j] == mainAxis[last] + 1) && (auxAxis[j] == auxAxis[last] - 1)) {
						last = j
						qt++
					}
				} else {
					return qt
				}
			}
			qt = 1
		}

		//left diagonal
		else if (direction === 'ld') {
			last = i
			for (var j = 0; j < mainAxis.length; j++) {
				if (qt < 4) {
					if ((mainAxis[j] == mainAxis[last] + 1) && (auxAxis[j] == auxAxis[last] + 1)) {
						last = j
						qt++
					}
				} else {
					return qt
				}
			}
			if (qt < 4) {
				qt = 1
			} else {
				return qt
			}
		}
	}
	return qt
}

// #endregion Verify Winner