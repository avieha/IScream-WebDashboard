import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * Public route for public page show for all user
 * @param Component
 * @param restricted
 * @param rest
 * @returns {JSX.Element}
 * @constructor
 */
const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            <Redirect to="/home" />
        )} />
    );
};

export default PublicRoute;