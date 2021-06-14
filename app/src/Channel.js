import React from 'react'
import firebase from 'firebase';
import Message from './Message'


function Channel({user}) {
    const [messages, setMessages] = React.useState([]); // all messages
    const [newMessage, setNewMessage] = React.useState({}); // new message to be created
    const [newMessageText, setNewMessageText] = React.useState();
    const db = firebase.firestore();
    const query = db.collection("messages").orderBy("createdAt").limit(100);

    const signOut = async () => {
        await firebase.auth().signOut();
      }

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
        setNewMessage({
            userid: user.uid,
            username: user.displayName,
            msg: newMessageText.trim(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        setNewMessageText("");
        // adds new doc with generated ID and new the new message object
        const msgRef = await db.collection("messages").add(newMessage);
        // console.log(newMessage);
        
    }

    return (

        
        <div>
            <h2>Profile Data</h2>
            <p>{user.displayName}</p>
            <h3>Messages in current room</h3>
            <button onClick={signOut}>Sign out</button>
            <form onSubmit={postMsg}>
                <input type="text" placeholder="Enter your message here" onChange={(e) => setNewMessageText(e.target.value)}/>
                <input type="submit" value="post"/>
            </form>
            {messages ? (
                messages.map((message) => (
                    <Message message={message} key={message.id}/>
                ))
            ) : (<h4>No messages in this room</h4>)}

            
        </div>
    )
}

export default Channel
