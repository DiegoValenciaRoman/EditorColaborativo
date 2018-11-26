let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3001;

io.set('heartbeat interval', 900000);

io.on('connection', (socket) => {
  console.log('usuario conectado');

    socket.on('sala',(room)=>{
        socket.join(room);

        console.log('usuario entro a la sala' + room);
    });


    socket.on('new-message', (message) => {
      console.log(message);
      io.emit('new-message', message);
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
