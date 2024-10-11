const express = require('express');
const app = express();
const port = 3000;

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });

    socket.on('join', (username) => {
        console.log(`${username} se ha unido al chat`);
    });

    socket.on('chat', (data) => {
        console.log(`${data.user} dice: ${data.msg}`);
        io.emit('chat', data); // Reenviar el mensaje con el nombre y el mensaje
    });

});


app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/cliente/index.html`);
})

server.listen(port, () => {
    console.log(`El servidor esta escuchando en el puerto ${port} http://localhost:${port}`)
});