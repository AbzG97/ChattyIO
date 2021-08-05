import React from "react";
import styled from "styled-components";
import socketIOClient from "socket.io-client";
import {useHistory} from 'react-router-dom';


function MainMenu({username, setUsername, room, setRoom}) {
    const history = useHistory();
   
    const JoinRoom = (e) => {
        e.preventDefault();
        const socket = socketIOClient(process.env.REACT_APP_SOCKETIO_SERVER);
        socket.on('join', {username, room});
        history.push('/chat');
    }

  return (
    <StyledMainMenu>
      <div class="join-container">
        <header class="join-header">
          <p>
            ChattyIO
          </p>
        </header>
        <form onSubmit={JoinRoom} method="GET">
          <div class="form-control">
            <label for="username">Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              required
            />
          </div>
          <div class="input-field">
            <select name="room" id="room" onChange={(e) => setRoom(e.target.value)}>
              <option value="JavaScript" selected>
                JavaScript
              </option>
              <option value="Python">Python</option>
              <option value="PHP">PHP</option>
              <option value="C#">C#</option>
              <option value="Ruby">Ruby</option>
              <option value="Java">Java</option>
            </select>
            <label>Join a room</label>
          </div>
          <button type="submit" class="btn waves-effect waves-light">
            Join Chat
          </button>
        </form>
      </div>
    </StyledMainMenu>
  );
}

const StyledMainMenu = styled.div`

`;

export default MainMenu;
