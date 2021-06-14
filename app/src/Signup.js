import React from 'react'
import firebase from "firebase";
import {useHistory} from 'react-router-dom'

function Signup({email, setEmail, password, setPassword,username, setUsername}) {
    const history = useHistory();
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
          history.push("/");
        } catch {
          alert("failed to create account");
        }
        
      }
    return (
        <div>
            <h2>Sign up</h2> 
            <form onSubmit={signUp}>
                <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
                <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
                <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                <input type="submit" value="signup"/>
            </form>
        </div>
    )
}

export default Signup
