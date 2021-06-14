import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {Button} from 'react-bootstrap'

function Title({user}) {
    return (
        <StyledTitle>
            <h1>ChattyIO</h1>
            {user ? " " : (
            <div className="links">
                <Link className="link" to="/login"><Button variant="outline-primary">Login</Button></Link>
                <Link className="link" to="/signup"><Button variant="outline-primary" >Signup</Button></Link>
            </div> )}
        </StyledTitle>
    )
}

const StyledTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1rem;
    margin : 1rem;
    .links {
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
        width: 35%;
        .link {
            text-decoration: none;
            button {
                font-size: 1.5rem;
            }
        }
    }
    h1 {
        font-size: 3.5rem;
    }

`

export default Title
