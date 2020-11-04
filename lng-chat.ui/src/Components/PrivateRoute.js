import React from 'react'
import { Route } from 'react-router-dom';
import {accountService} from "../Services/accountService";

export default function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={props => {
            const currentToken = accountService.accessToken;
            if (!currentToken) {
                // not logged in so redirect to login page
                window.location.href = window.location.origin;
                return null;
            }
    
            // authorized so return component
            return <Component {...props} />
        }} />
    )
}
