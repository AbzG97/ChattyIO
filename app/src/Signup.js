import React from 'react'
import firebase from "firebase"
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import {Form, Button} from 'react-bootstrap'

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
        <StyledSignup>
            <h2>Sign up</h2> 
            <Form className="signupForm" onSubmit={signUp}>
                <Form.Group className="field">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group className="field">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}/>
                </Form.Group>

                <Form.Group className="field">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                <Button className="submitBtn" variant="outline-success" type="submit">Signup</Button>
            </Form>
        </StyledSignup>
    )
}

const StyledSignup = styled.div `
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

export default Signup
