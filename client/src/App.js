import  './App.css';
import {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { UserContextProvider } from "./context/userContext";


import { useState, createContext, useContext } from "react";
/**
 * Open start app
 */

class App extends Component {
    render() {
        return (
            <UserContextProvider>
                <Route>
                <Switch>
                    <Route component={Home} restricted={true}  path="/" exact />
                    <Route component={Home} path="/home" exact />
                    <Route component={NotFound}/>
                </Switch>
            </Route>
                </UserContextProvider>
                );
    }
}


export default App;



