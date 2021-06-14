import React from 'react'

function Message({message}) {
    return (
        <div>
            <p>{JSON.stringify(message)}</p>
            
        </div>
    )
}

export default Message
