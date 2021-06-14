import React from 'react'
import firebase from "firebase";
import {useHistory} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import styled from 'styled-components';

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
        <StyledLogin>
        <h2>Login</h2> 
        <Form className="signupForm" onSubmit={login}>
            <Form.Group className="field">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group className="field">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

            <Button className="submitBtn" variant="outline-success" type="submit">Login</Button>
        </Form>
    </StyledLogin>
    )
}

const StyledLogin = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .signupForm {
        /* background-color: lightgreen; */
        border: 1px solid black;
        border-radius: 15px;
        padding: 2rem;
        margin-top: 1rem;
        display: flex;
        width: 25%;
        align-items: stretch;
        justify-content: center;
        flex-direction: column;
        .field {
            margin-top: 1rem;
        }
        .submitBtn {
            margin-top: 1rem;
            /* width: 50%; */
        }
    }

`


export default Login
