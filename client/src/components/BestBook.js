import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/userContext";
import {useHistory} from 'react-router-dom';
import Button from "@mui/material/Button";
import { Typography, Container } from '@mui/material';

export default function Dashboard() {
    const [tastes, setTastes] = useState();
    const [loading, setLoading] = useState(false);
    // const [favorites, setFavorites] = useState([]);
    const [isloaded, setIsLoaded] = useState(false);
    const history=useHistory();
    // const {user} = useContext(UserContext);

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

    const getAllTastes = async () => {
        await fetch('http://localhost:3002/api/getAllInventory', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => res.json())
            .then((json) => {
                console.log(json);
                console.log("tastes: ", tastes);
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    }

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
        // getAllTastes().then((r) => setTastes(r));
        async function getAll() {
            await fetch('http://localhost:3002/api/getAllInventory', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((res) => res.json())
                .then((json) => {
                    console.log(json);
                    setTastes(json)
                    console.log("tastes: ", tastes);
                })
        }
        getAll();
    }, [])

    return (
        <div>
            <Box display="flex"
                 alignItems="center"
                 justifyContent="center">
                <h2>הטעמים שיש בכל הסניפים:</h2>
            </Box>
            <Grid container justifyContent="center">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: {md: 'row'},
                        alignItems: 'center',
                        bgcolor: 'background.paper',
                        // bgcolor:  'black',
                        overflow: 'auto',
                        borderRadius: '16px',
                        boxShadow: 15,
                        fontWeight: 'bold',
                        m: 10,
                        justifyContent: 'flex-start',
                        alignContent: 'flex-start',

                    }}
                >
                    {tastes.length?
                        tastes.map((taste, i) => (
                            <Grid taste mx={1} key={i}>
                                <Card sx={{display: "flex",flexDirection: "column", boxShadow:2, height:400}}>
                                    <Typography  variant="inherit" textAlign={'center'} maxHeight={25} marginTop={1.5}>{taste}</Typography>
                                </Card>
                            </Grid>
                        )) : <CircularProgress /> }
                    {/*<p><br/>אין טעמים בחנויות עדיין...</p>}*/}
                </Box>
            </Grid>
        </div>
    );
}