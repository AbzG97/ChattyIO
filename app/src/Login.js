import React from 'react'
import firebase from "firebase";
import {useHistory} from 'react-router-dom'

function Login({email,setEmail,password, setPassword}) {
    const history = useHistory();

    const login = async (e) => {
        e.preventDefault();
    
        try {
          const loginUser = await firebase.auth().signInWithEmailAndPassword(email, password);
          setEmail(" ");
          setPassword(" ");
          history.push("/");

    
          
        } catch {
          alert("failed to login");
        }
    }
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={login}>
                <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
                <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                <input type="submit" value="Login"/>
            </form> 
        </div>
    )
}

export default Login
