const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const { isObject } = require("util");

const app = express();
const server = http.createServer(app);
const chatServer = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

// run when the client connect to the server
chatServer.on("connection", socket => {
    console.log("new connection.....");

    // will be sent to ONLY the client when connecting
    socket.emit("message", "Welcome to chattyIO");

    // broadcast to everyone that a user joined
    socket.broadcast.emit("message", "user has joined the the chat");

    // runs when a client disconnect
    socket.on("disconnect", () => {
        chatServer.emit("message", "a user has left the chat");
    });

    // listen to the client for messages
    socket.on("chatMessage", msg => {
        // emit the chat message sent from client to everyone
        chatServer.emit("message", msg);
    })
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));