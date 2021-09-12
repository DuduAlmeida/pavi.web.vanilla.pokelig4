// #region Imports

const express = require('express');
const app = express();
const socketio = require('socket.io');

// #endregion Imports

// #region Settings

app.use('/', express.static('events'));

const expressServer = app.listen(9000);
const io = new socketio.Server(expressServer);

// #endregion Settings

// #region OnStart Application

io.on('connection', (socket) => {
    socket.emit('messageFromServer', { data: 'Welcome to the socketio server!' });

    socket.on('messageToServer', (dataFromClient) => {
        console.log(dataFromClient);
    });

    socket.on('newMessageToServer', (msg) => {
        console.log(msg);
        io.emit('messageToClients', { text: msg.text });
    });
})

// #endregion OnStart Application