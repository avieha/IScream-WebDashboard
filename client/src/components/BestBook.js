import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom';
import Button from "@mui/material/Button";
import { Typography, Container } from '@mui/material';
import axios from "axios";
import TotalInventory from './TotalInventory'

export default function Dashboard() {
    const [inventory, setinventory] = useState();
    const [tastes, setTastes] = useState();
    const [loading, setLoading] = useState(false);

    // const handleDetails =  async (itemID) => {
    //     await fetch('http://localhost:3001/item/' + itemID,{
    //         method: "GET",
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //         .then((res) => res.json())
    //         .then((json) => {
    //             // console.log(json)
    //         })
    //     history.push('/itemdetails/'+itemID,{
    //         item: itemID
    //     })
    // }

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

    // const getItemByGenreConsole = async () => {
    //     const id = user.id;
    //     await fetch("http://localhost:3001/user/" + id, {
    //         method: "GET",
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     }).then(function (response) {
    //         return response.json();
    //     }).then(function (user) {
    //         if (user) {
    //             const rand = Math.floor(Math.random() * 3);
    //             fetch('http://localhost:3001/item/getitembygenreconsole/' + (user['sendUser'].genres[rand]) + '/'
    //                 + (user['sendUser'].console))
    //                 .then((res) => res.json())
    //                 .then((json) => {
    //                     setFavorites(json);
    //                 })
    //         }
    //     })
    // }
    //

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