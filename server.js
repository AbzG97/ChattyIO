const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const message = require("./message");



// url.parse(req.url,true).query

const app = express();
const server = http.createServer(app);
const chatServer = socketio(server);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }))


let users = [];


// run when the client connect to the server
chatServer.on("connection", socket => {
    console.log("new connection.....");

    // join room 
    socket.on("join", ({username, room}) => {
        const id = socket.id;

        const user  = {id, username, room};
        users.push(user);

        // join the user to a room
        socket.join(user.room);

        console.log(users);


        // will be sent to ONLY the client when connecting
        socket.emit("message", 
            message.formatMessage("ChattyIO bot","Welcome to chattyIO"));

        // broadcast to everyone that a user joined
        socket.broadcast.to(user.room).emit("message", 
            message.formatMessage("ChattyIO bot", `${user.username} has joined the chat`));


        // listen to the client for messages
        socket.on("chatMessage", msg => {
            // emit the chat message sent from client to everyone
            chatServer.to(user.room).emit("message", message.formatMessage(user.username, msg));
        });

        // runs when a client disconnect
        socket.on("disconnect", () => {
            chatServer.emit("message", 
                message.formatMessage("ChattyIO bot",`${user.username} has left the chat`));
                // remove the user from array
                const filtered = users.filter((user) => socket.id !== user.id);
                users = filtered;
                console.log(users);
        });
    });
   
});



const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));