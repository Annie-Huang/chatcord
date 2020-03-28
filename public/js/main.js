const chatForm = document.getElementById('chat-form');
const chatMesssages = document.querySelector('.chat-messages');

const socket = io();

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

