import firebase from "firebase";
import "./firebase";
import React from 'react'
import Channel from "./Channel";
const App = () => {
  const [user, setUser] = React.useState(() => firebase.auth().currentUser);
  const [username, setUsername] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [initUser, setInitUser] = React.useState(true);
  

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const createdUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
      // console.log(createdUser);
      await createdUser.user.updateProfile({displayName: username});
      // await createdUser.auth().updateProfile();
      setUsername(" ");
      setEmail(" ");
      setPassword(" ");
    } catch {
      alert("failed to create account");
    }
    
  }

  const login = async (e) => {
    e.preventDefault();

    try {
      const loginUser = await firebase.auth().signInWithEmailAndPassword(email, password);
      setEmail(" ");
      setPassword(" ");

      
    } catch {
      alert("failed to login");
    }

  }

  const signOut = async () => {
    await firebase.auth().signOut();
  }

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
      <h1>ChattyIO</h1>
      
      {!user ? <div> <h2>Sign up</h2> <form onSubmit={signUp}>
        <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
        <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
        <input type="submit" value="signup"/>
      </form>
      <hr></hr>
      <h2>Login</h2>
      <form onSubmit={login}>
        <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
        <input type="submit" value="Login"/>
      </form> </div>: " "}
      {user ? (
        <div>
          <h2>Profile Data</h2>
          <p>{user.displayName}</p>
          <button onClick={signOut}>Sign out</button>
          <Channel user={user}/>
        </div>
      ) : (
        <div>
          <h2>No user logged in</h2>
        </div>
      ) }
      {/* <button>Sign up</button>
      <button>Login</button> */}

    </div>
  );
}

export default App;
