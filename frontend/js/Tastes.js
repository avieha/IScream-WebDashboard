import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/userContext";
import {useHistory} from 'react-router-dom';
import Button from "@mui/material/Button";
import { Typography, Container } from '@mui/material';
import axios from "axios";
import TotalInventory from './TotalInventory'

export default function Dashboard() {
    const [inventory, setinventory] = useState();
    const [tastes, setTastes] = useState();
    const [loading, setLoading] = useState(false);
    // const [favorites, setFavorites] = useState([]);
    const [isloaded, setIsLoaded] = useState(false);
    const history=useHistory();
    // const {user} = useContext(UserContext);


    const getAllTastes = () => {
        return new Promise((resolve,reject)=>{
            axios.get(`http://localhost:3002/api/getTastes`).then((result)=>{resolve(result.data)}).catch(reject)
        })
    };

    const getAllInventory = () => {
        return new Promise((resolve,reject)=>{
            axios.get(`http://localhost:3002/api/getAllInventory`).then((result)=>{resolve(result.data)}).catch(reject)
        })
    };

    const fetchData = async () => {
        try {
            setinventory(await getAllInventory());
            setTastes(await getAllTastes());
        } catch (error) {}
    };


    useEffect( () => {
        fetchData();
        let timer = setInterval(async () => {}, 5000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div>
            <Box display="flex"
                 alignItems="center"
                 justifyContent="center">
                <h2>הטעמים שיש בכל הסניפים:</h2>
            </Box>
            <Grid container justifyContent="center">
                <TotalInventory inventoryData={inventory} tastes={tastes} />
            </Grid>
        </div>
    );
}