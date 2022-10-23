import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../utils';
import { useContext } from "react";
import {UserContext} from '../context/userContext'

/**
 * Public route for public page show for all user
 * @param Component
 * @param restricted
 * @param rest
 * @returns {JSX.Element}
 * @constructor
 */
const PublicRoute = ({component: Component, restricted, ...rest}) => {
    const {user} = useContext(UserContext);
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            user && restricted ?
                <Redirect to="/home" />
                : <Component {...props} />
        )} />
    );
};

export default PublicRoute;