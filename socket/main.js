// #region Imports

const express = require('express');
const app = express();
const socketio = require('socket.io');

let listNamespaces = require('./data/poke.namespace');

// #endregion Imports

// #region Settings

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/home.html');
});

const expressServer = app.listen(4321);
const io = new socketio.Server(expressServer);

// #endregion Settings

// #region OnStart Application

listNamespaces.forEach((namespace) => {
	io.of(namespace.endpoint).on('connection', (nsSocket) => {

		// #region OnConnection

		console.log(`${nsSocket.id} has join ${namespace.endpoint}`);
		nsSocket.emit('nsRoomLoad', namespace.rooms);

		// #endregion OnConnection

		// #region OnJoinRoom

		nsSocket.on('joinRoom', (roomToJoin) => {
			console.log(nsSocket.rooms);

			const roomToLeave = Object.keys(nsSocket.rooms)[1];

			nsSocket.leave(roomToLeave);
			updateUsersLengthInRoom(namespace, roomToLeave);
			nsSocket.join(roomToJoin);

			const nsRoom = namespace.rooms.find((room) => {
				return room.name === roomToJoin;
			})

			nsSocket.emit('ChatHistoryCatchUp', nsRoom.chatHistory);
			nsSocket.emit('GameHistoryCatchUp', nsRoom.gameHistory);
			updateUsersLengthInRoom(namespace, roomToJoin);
		});

		// #endregion OnJoinRoom

		// #region OnNewMessageToServer

		nsSocket.on('newMessageToServer', (msg) => {
			const fullMsg = {
				text: msg.text,
				time: Date.now(),
				user: msg.user,
				color: msg.color,
			}

			const roomName = Object.keys(nsSocket.rooms)[1];
			const nsRoom = namespace.rooms.find((room) => {
				return room.name === roomName;
			});

			nsRoom.addMessage(fullMsg);
			io.of(namespace.endpoint).to(roomName).emit('messageToClients', fullMsg);
		});

		// #endregion OnNewMessageToServer
	})
});

function updateUsersLengthInRoom(namespace, roomToJoin) {
	// Send back the number of users in this room to ALL sockets connected to this room
	io.of(namespace.endpoint).in(roomToJoin).clients((error, clients) => {
		// console.log(`There are ${clients.length} in this room`);
		io.of(namespace.endpoint).in(roomToJoin).emit('countUsers', clients.length)
	})
}

// #endregion OnStart Application