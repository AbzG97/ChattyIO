import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Chat from './pages/Chat';
import MainMenu from './pages/MainMenu';



function App() {
  const [username, setUsername] = React.useState();
  const [room, setRoom] = React.useState();
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <MainMenu username={username} setUsername={setUsername} room={room} setRoom={setRoom}/>
        </Route>

        <Route path="/chat">
          <Chat username={username} room={room}/>
        </Route>
      </Switch>

      
    </div>
  );
}

export default App;
