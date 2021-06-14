import React from 'react'
import styled from 'styled-components'
import firebase from 'firebase';

function Sidemenu({user}) {
    const signOut = async () => {
        await firebase.auth().signOut();
      }
    return (
       <StyledMenu>
           <div className="userData">
               <p>{user.displayName}</p>
               <button onClick={signOut}>Sign out</button>
           </div>
       </StyledMenu>
    )
}

const StyledMenu = styled.div`
    background-color: lightgreen;
    width: 20%;
`

export default Sidemenu

