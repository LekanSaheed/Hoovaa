import React from 'react'
import {Route} from 'react-router-dom'
import Login from './Auth/Login'
const PrivateRoute = ({component, isUser, ...rest}) => {
   
    const finalComponent = isUser ? component : Login
    return <Route {...rest} component={finalComponent}/>
}

export default PrivateRoute
