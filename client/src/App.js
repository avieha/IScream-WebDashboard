import  './App.css';
import Login from './routes/SignIn'
import Register from "./routes/SignUp";
import {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Profile from './routes/Profile'
import Message from './routes/Message'
import Trades from './routes/MyTrades'
import Items from './routes/MyItems'
import TradeDetails from './routes/TradeDetails'
import ItemDetails from './routes/ItemDetails'
import NewTrade from './routes/NewTrade'
import { UserContext,UserContextProvider } from "./context/userContext";
import Search from './routes/SearchPage'
import UserProfile from './routes/UserProfile'


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
                    <PublicRoute component={Login} restricted={true}  path="/" exact />
                    <PublicRoute component={Login} restricted={true}  path="/login" exact />
                    <PrivateRoute component={Home} path="/home" exact />
                    <PrivateRoute component={Profile} path="/profile" exact/>
                    <PublicRoute restricted={true} component={Register} path="/signup" exact />
                    <PrivateRoute component={Message} path="/message" exact/>
                    <PrivateRoute component={Trades} path="/mytrades" exact/>
                    <PrivateRoute component={TradeDetails} path="/tradedetails" exact/>
                    <PrivateRoute component={ItemDetails} path="/itemdetails/:id" exact/>
                    <PrivateRoute component={Items} path="/myitems" exact/>
                    <PrivateRoute component={NewTrade} path="/newTrade" exact/>
                    <PrivateRoute component={Search} path="/search" exact/>
                    <PrivateRoute component={UserProfile} path="/userProfile" exact/>
                    <Route component={NotFound}/>
                </Switch>
            </Route>
                </UserContextProvider>
                );
    }
}


export default App;



