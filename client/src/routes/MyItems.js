import React, {useEffect, useState} from 'react'
import NavBar from '../components/NavBar'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Button from "@mui/material/Button";
import {getId} from '../utils';
import NewItem from './NewItem'
import Card from '@mui/material/Card';
import {useHistory} from 'react-router-dom';
import { useContext} from "react";
import { UserContext } from "../context/userContext";
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

export default function MyItems(){
    const {user} = useContext(UserContext);
    const userID= user.id
    const [books, setBooks] = useState([]);
    const [games, setGames] = useState([]);
    const history=useHistory();

    const getUserItemsbybook = async () => {
        await fetch('http://localhost:3001/item/getitembyuser/' + userID + '/book')
            .then((res) => res.json())
            .then((json) => {
                setBooks(json)
            })
    }
    const getUserItemsbygame = async () => {
        await fetch('http://localhost:3001/item/getitembyuser/' + userID + '/video game')
            .then((res) => res.json())
            .then((json) => {
                setGames(json)
            })
    }

    const handleDetails =  async (itemID) => {
        await fetch('http://localhost:3001/item/' + itemID,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            // .then((json) => {
            //     console.log(json)
            // })
        history.push('/itemdetails/'+itemID,{
            item: itemID
        })
    }

    useEffect(() => {
        getUserItemsbybook();
        getUserItemsbygame();
    }, []);


    return(
        <div style={{fontFamily: 'Tahoma'}}>
            <CssBaseline/>
            <ThemeProvider theme={theme}>
                <NavBar/>
                <br/><br/>
                <NewItem />
                <Box style={{marginRight: 80, marginBlockEnd: -80, marginTop: 50,}}>
                    <h2>הספרים שלי</h2>
                </Box>
                <Grid container>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: {md: 'row'},
                            alignItems: 'center',
                            bgcolor: 'background.paper',
                            overflow: 'auto',
                            borderRadius: '16px',
                            boxShadow: 1,
                            fontWeight: 'bold',
                            m: 10,
                            justifyContent: 'flex-start',
                            alignContent: 'flex-start',

                        }}
                    >
                        {books.length?
                            books.map((book, i) => (
                        <Grid item mx={1} key={i}>
                            <Card>
                                <Button onClick={handleDetails.bind(this,book._id)}>
                                    <img src={book.image}
                                         alt='item_img'
                                         width={200}
                                    />
                                </Button>
                            </Card>
                        </Grid>
                            )) : <p><br/>אין ספרים עדיין...</p>}
                    </Box>
                    </Grid>
                <Box style={{marginRight: 80, marginBlockEnd: -80, marginTop: 50,}}>
                    <h2>משחקי הוידאו שלי</h2>
                </Box>
                    <Grid container>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: {md: 'row'},
                            alignItems: 'center',
                            bgcolor: 'background.paper',
                            overflow: 'auto',
                            borderRadius: '16px',
                            boxShadow: 1,
                            fontWeight: 'bold',
                            m: 10,
                            justifyContent: 'flex-start',
                            alignContent: 'flex-start',

                        }}
                    >
                        {games.length?
                            games.map((game, j) => (
                                <Grid item mx={1} key={j}>
                                    <Card>
                                        <Button
                                            onClick={handleDetails.bind(this,game._id)}>
                                                <img src={game.image}
                                                     alt='item_img'
                                                     width={200}
                                                />
                                        </Button>
                                    </Card>
                                </Grid>
                            )) : <p><br/>אין משחקי וידאו עדיין...</p>}
                    </Box>
                </Grid>
            </ThemeProvider>
        </div>
    );
}