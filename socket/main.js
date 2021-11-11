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

		// #region OnNewMessageToServer

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
			console.log(nsRoom.users);
			io.of(namespace.endpoint).to(roomName).emit('listPlayers', nsRoom.users);
		});

		// #endregion OnNewMessageToServer
	})
});

function updateUsersLengthInRoom(namespace, roomToJoin) {
	let clients = io.of(namespace.endpoint).sockets;
	clients = Array.from(clients);

	io.of(namespace.endpoint).in(roomToJoin).emit('countUsers', Object.keys(clients).length)
}

// #endregion OnStart Application
