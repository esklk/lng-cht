import React from 'react'
import { Route } from 'react-router-dom';
import {accountService} from "../Services/accountService";

export default function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={props => {
            const currentUser = accountService.currentUserValue;
            if (!currentUser) {
                // not logged in so redirect to login page
                window.location.href = window.location.origin;
            }
    
            // authorized so return component
            return <Component {...props} />
        }} />
    )
}
