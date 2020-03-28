const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', socket => {
    console.log('New WS Connection...');

    // Only emit to the single client that is connecting
    socket.emit('message', 'Welcome to ChatCord!');

    // Broadcast when a user connects
    // Broadcast to all the users except for the user that is connecting
    socket.broadcast.emit('message', 'A user has joined the chat')

    // Broadcast to everyone.
    // io.emit();
});

const PORT = 3000 || process.env.POST;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
