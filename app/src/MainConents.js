import React from 'react'
import Channel from './Channel'
import Sidemenu from './Sidemenu'
import styled from 'styled-components'

function MainConents({user}) {
    return (
        <StyledMainContent>
            <Sidemenu user={user}/>
            <Channel user={user}/>
        </StyledMainContent>
    )
}

const StyledMainContent = styled.div`
    display: flex;
    flex-direction: row;
    /* height: 100%; */
`

export default MainConents
