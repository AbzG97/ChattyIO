const chatForm = document.querySelector("#chat-form");
const chat_messages = document.querySelector(".chat-messages");
const chatMessage = document.querySelector("#msg");
const socket = io();

// get username and room from url
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});



// join chat room
socket.emit("join", {username, room});

// get room and current users in that room
socket.on("roomUsers", ({room, users}) => {
    outputRoom(room);
    outputCurrentUsers(users);
});

// get the message from server to be displayed in client
socket.on("message", message => {
    // view message in client
    outputMessage(message);    
});


const outputMessage = (message) => {
    
    const messageDiv = document.createElement('div');
    messageDiv.classList.add("message");

    const text = document.createElement("p");
    text.classList.add('text');
    text.textContent = message.text;

    

    const username = document.createElement('p');
    username.classList.add("meta");
    username.textContent = message.username + " ";
    const timestamp = document.createElement("span");
    timestamp.textContent = message.time;
    username.appendChild(timestamp);

    messageDiv.appendChild(username);
    messageDiv.appendChild(text);
    

    chat_messages.appendChild(messageDiv);
}

// send message
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    
    // send message to the server
    socket.emit("chatMessage", chatMessage.value);

    // auto scrolls
    chat_messages.scrollTop = chat_messages.scrollHeight;

    chatMessage.value = "";
});

// display room name
const outputRoom = (room) => {
    document.getElementById("room-name").textContent = room;
}

// display current users
const outputCurrentUsers = (users) => {
    document.getElementById("users").innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join("")}`
}

