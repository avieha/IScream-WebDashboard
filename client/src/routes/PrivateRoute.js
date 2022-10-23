import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../utils';
import { useContext } from "react";
import {UserContext} from '../context/userContext'
/**
 * Private Page Route for protecting
 * @param Component
 * @param rest
 * @returns {JSX.Element}
 * @constructor
 */
const PrivateRoute = ({component: Component, ...rest}) => {
    const {user} = useContext(UserContext);
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            // isLogin() ?
            user ?
                <Component {...props} />
                : <Redirect to="/home" />
        )} />
    );
};

export default PrivateRoute;