import {useState, createContext,useReducer ,useEffect} from "react";
import React from "react";
import userReducer from "./userReducer";

//export const UserContext = createContext(null);

const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
};


export  const UserContext = createContext(INITIAL_STATE);

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])

    return (
        <UserContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};