const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/message.js'); // Remember to use related path otherwise compile error.


const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord Bot';

// Run when client connects
io.on('connection', socket => {
    // console.log('New WS Connection...');

    socket.on('joinRoom', ({username, room}) => {
        // Only emit to the single client that is connecting
        // Welcome current User
        socket.emit('message', formatMessage(botName,'Welcome to ChatCord!'));

        // Broadcast to all the users except for the user that is connecting
        // Broadcast when a user connects
        socket.broadcast.emit('message', formatMessage(botName,'A user has joined the chat'));

        // Broadcast to everyone.
        // io.emit();
    });

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        // console.log(msg); // the logging is in the terminal
        io.emit('message', formatMessage('USER', msg))
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName,'A user has left the chat'));
    });
});

const PORT = 3000 || process.env.POST;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
