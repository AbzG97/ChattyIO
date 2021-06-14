import React from 'react'
import {Alert} from 'react-bootstrap'
import styled from 'styled-components'

function Message({message, user}) {
    return (
        <StyledMsg>
            <Alert className="alert" variant="success">
                <p class="username">{message.username}</p>
                <p class="message"> {message.msg}</p>
                <p class="createdAt">{message.createdAt ? new Date(message.createdAt.seconds * 1000).toLocaleString() : "loading"}</p>
            </Alert>
        </StyledMsg>
        
    )
}

const StyledMsg = styled.div`
    width: 50%;
    /* padding: 1rem; */
    margin: 1rem;
    .alert {
        padding: .5rem;
        position: relative;
        .username {
            font-weight: bold;
        }
        .createdAt {
            position: absolute;
            bottom: 0;
            right: 0;
        }
    }
   

`

export default Message
