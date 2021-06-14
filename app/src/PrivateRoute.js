import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import firebase from 'firebase'

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            firebase.auth().currentUser ? Component ? <Component {...props}/> :
            rest.render(props) : <Redirect to="/login"/>
        )}/>
    )
}

export default PrivateRoute