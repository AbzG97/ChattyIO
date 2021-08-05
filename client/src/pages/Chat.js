import React from "react";
import {Link} from 'react-router-dom';
import socketIOClient from "socket.io-client";

function Chat({ username, room }) {
    const [message, setMessage] = React.useState();
    const [usersInRoom, setUsersInRoom] = React.useState();
    const [messagesInRoom, setMessagesInRoom] = React.useState();

    const PostMessage = (e) => {
        e.preventDefault();
        const socket = socketIOClient(process.env.REACT_APP_SOCKETIO_SERVER, {transports: ['websocket']});
        socket.emit("chatMessage", message);

    }

    React.useEffect(() => {
        const socket = socketIOClient(process.env.REACT_APP_SOCKETIO_SERVER, {transports: ['websocket']});
        socket.on("chatMessage", data => {
          console.log(data);
        });
      }, []);

    return (
        <div>
        <div  className="chat-container">
            <header  className="chat-header">
            <p>ChattyIO</p>
            <Link to="/">Leave chat</Link> 
            </header> 
            <main  className="chat-main">
            <div  className="chat-sidebar">
                <h2 id="room-name"> Room Name: {room} </h2>
                <h2 className="user">{username}</h2> 
                <p>
                <i  className="fas fa-users"> </i> Users
                </p>
                <ul id="users">


                </ul> 
            </div> 
            <div  className="chat-messages"></div> 
            </main> 
            <div  className="chat-form-container">
            <form className="chat-form" onSubmit={PostMessage}>
                <input
                onChange={(e) => setMessage(e.target.value)}
                id="msg"
                type="text"
                placeholder="Enter a message"
                required

                />
                <input value="Send" type="submit"/> 
            </form> 
            </div> 
        </div>
        </div>
  );
}

export default Chat;
