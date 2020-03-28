const chatForm = document.getElementById('chat-form');

const socket = io();

socket.on('message', message => {
    console.log(message);
});

// Message submit
chatForm.addEventListener('submit', e => {
    e.preventDefault();

    // Get message text
    // This is linked to <input id="msg"../>
    const msg = e.target.elements.msg.value;

    // Emit message to server
    // console.log(msg);
    socket.emit('chatMessage', msg);
});
