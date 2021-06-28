const chatForm = document.querySelector("#chat-form");
// console.log(chatForm);
const socket = io();

// get the message from server to be displayed in client
socket.on("message", message => {
    console.log(message);
    // view message in client
    outputMessage(message);
});


const outputMessage = (message) => {
    
    const messageDiv = document.createElement('div');
    messageDiv.classList.add("message");

    const text = document.createElement("p");
    text.classList.add('text');
    text.textContent = message;

    

    const username = document.createElement('p');
    username.classList.add("meta");
    username.textContent = "Bob ";
    const timestamp = document.createElement("span");
    timestamp.textContent = "9:55pm";
    username.appendChild(timestamp);

    messageDiv.appendChild(username);
    messageDiv.appendChild(text);
    

    const chat_messages = document.querySelector(".chat-messages");

    chat_messages.appendChild(messageDiv);
}

// send message
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const chatMessage = document.querySelector("#msg").value;
    
    // send message to the server
    socket.emit("chatMessage", chatMessage);
   
});

