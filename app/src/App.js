import firebase from "firebase";
import "./firebase";
import React from 'react'
import Channel from "./Channel";
import MainConents from "./MainConents";
import {Switch, Route, Link} from 'react-router-dom';
import Login from "./Login";
import Signup from "./Signup";
import PrivateRoute from "./PrivateRoute";
import Title from "./Title";

const App = () => {
  const [user, setUser] = React.useState(() => firebase.auth().currentUser);
  const [username, setUsername] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [initUser, setInitUser] = React.useState(true);
  


  React.useEffect(() => {
    // will also want to know whether your users are currently signed-in or signed-out of your application.
    const unsub = firebase.auth().onAuthStateChanged((user) => {
      if(user){
        setUser(user);
      } else {
        setUser(false);
      }
      setInitUser(false);
    });

    return unsub;

  }, [initUser]);


  return (
    <div className="App">
      <Title user={user}/>
      <hr></hr>
      <Switch>
        

        <Route path="/login" render={(props) => <Login  {...props} email={email} setEmail={setEmail} password={password} setPassword={setPassword}/>}/>

        <Route path="/signup" render={(props) => <Signup  {...props} email={email} setEmail={setEmail} password={password} 
        setPassword={setPassword} username={username} setUsername={setUsername}/>}/>

        <PrivateRoute path="/" exact user={user} render={(props) => <MainConents {...props} user={user}/> }/>

        

      </Switch>

    </div>
  );
}

export default App;
