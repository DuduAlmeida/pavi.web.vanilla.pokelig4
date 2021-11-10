// #region Imports

const express = require('express');
const cors = require('cors')
const app = express();
const socketio = require('socket.io');

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
		});

		// #endregion OnJoinRoom

		// #region OnNewMessageToServer

		nsSocket.on('newMessageToServer', (msg) => {
			console.log(msg);
			const fullMsg = {
				text: msg.text,
				time: Date.now(),
				user: msg.user,
				color: msg.color,
			}

			const nsRoom = namespace.rooms[0];
			const roomName = nsRoom.name;


			nsRoom.addMessage(fullMsg);
			io.of(namespace.endpoint).to(roomName).emit('messageToClients', fullMsg);
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
