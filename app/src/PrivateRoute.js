import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import firebase from 'firebase'

const PrivateRoute = ({user, component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            user ? Component ? <Component {...props}/> :
            rest.render(props) : <Redirect to="/"/>
        )}/>
    )
}

export default PrivateRoute