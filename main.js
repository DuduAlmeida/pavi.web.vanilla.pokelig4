//We need http because we don't have express
const http = require('http');
//We need socket.io ... it's is 3 party
const socketio = require('socket.io');

//We make an http server with node!
const server = http.createServer((req, res) => {
  res.end("I am connected 2");
})

const io = new socketio.Server(server);

io.on('connection', (socket, req) => {
    console.log('Someone connected');
    socket.emit('welcome', 'Welcome to the websocket server!!')
    
  })
  
  server.listen(9000);