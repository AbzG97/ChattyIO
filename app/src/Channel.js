import React from 'react'
import firebase from 'firebase'
import Message from './Message'
import styled from 'styled-components';
import {Form, Button} from 'react-bootstrap'


function Channel({user}) {
    const [messages, setMessages] = React.useState([]); // all messages
    const [newMessageText, setNewMessageText] = React.useState();
    const db = firebase.firestore();
    const query = db.collection("messages").orderBy("createdAt").limit(100);

  

    React.useEffect(() => {
        // receive realtime updates 
        //  snapshots provide the ability to actually get the data we requested through our query
        const unsub = query.onSnapshot(snapshot => {
            // to access the docs (messages) returned by the query
            // we can just get it from the docs property in snapshot
            const data = snapshot.docs.map(msg => ({
                ...msg.data(),
                id: msg.id
            }));
            setMessages(data); // set state to render the messages
        });
        return unsub;
    }, []);



    const postMsg = async (e) => {
        e.preventDefault();
        // setNewMessageText("");
        // adds new doc with generated ID and new the new message object
        const msgRef = await db.collection("messages").add({
            userid: user.uid,
            username: user.displayName,
            msg: newMessageText,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        // console.log(newMessage);
        
    }

    return (
        <StyledChannel>
            <div class="messages">
                {messages ? (
                    messages.map((message) => (
                        <Message message={message} key={message.id} user={user}/>
                    ))
                ) : (<h4>No messages in this room</h4>)}
            </div>
            <div class="formContainer">
                <Form className="msgForm" onSubmit={postMsg}>
                    <Form.Control type="text" placeholder="Enter your message here" onChange={(e) => setNewMessageText(e.target.value)} required/>
                    <Button variant="outline-success" type="submit">Post</Button>        
                </Form>
            </div>
            
        </StyledChannel>
    )
}

const StyledChannel = styled.div`
    background-color: lightskyblue;
    width: 100%;
    .messages {
        overflow-y:scroll;
        height: 100vh;
        padding-bottom: 5rem;
    }
    .formContainer {
        width: 83.3%;
        bottom: 0;
        /* left: 25; */
        /* right: 24; */
        position: fixed;
        .msgForm {
            display: flex;
            flex-direction: row;
           
           
            /* left: 0; */
            
        }
    }
`

export default Channel
