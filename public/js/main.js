const chatForm = document.getElementById('chat-form');
const chatMesssages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


// Get username and room from URL
// the ignoreQueryPrefix to prevent letters like ?, & into the variable from this:
// http://localhost:3000/chat.html?username=Brad&room=JavaScript
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
// console.log(username, room);

const socket = io();

// Join chatroom
socket.emit('joinRoom', {username, room});

// Get room and users
socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room);
    outputUsers(users);
});


// Message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    // Scroll down
    chatMesssages.scrollTop = chatMesssages.scrollHeight;
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

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
    /*
        We will create something to inject like this format:
        <div class="message">
            <p class="meta">Brad <span>9:12pm</span></p>
            <p class="text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
                repudiandae.
            </p>
        </div>
     */
    const div = document.createElement('div')
    div.classList.add('message');
    // ${message}
    div.innerHTML = `
        <p class="meta">${message.username} <span>${message.time}</span></p>
        <p class="text">
            ${message.text}
        </p>    
    `;
    chatMesssages.appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}
