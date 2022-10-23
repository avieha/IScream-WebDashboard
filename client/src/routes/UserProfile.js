import React from 'react'
import {useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import NavBar from '../components/NavBar'
import CssBaseline from '@mui/material/CssBaseline';
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import {useHistory} from 'react-router-dom';

const theme = createTheme();


/**
 * Profile page for show info about user
 * @returns {JSX.Element}
 * @constructor
 */
export default function UserProfile(props) {
    const userID = props.location.state.user
    const history=useHistory();

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [imgProfile, setImgProfile] = useState('');
    const [city, setCity] = useState('');
    const [rating, setRating] = useState(0);
    const [numOfRating, setNumOfRating] = useState(0);
    const [items, setItems] = useState(0);


    const getUser = async () => {
        await fetch("http://localhost:3001/user/" + userID, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
            return response.json();
        }).then(function (user) {
            if (user) {
                setEmail(user['sendUser'].email)
                setFirstName(user['sendUser'].firstName)
                setLastName(user['sendUser'].lastName)
                setImgProfile(user['sendUser'].imageProfile)
                setCity(user['sendUser'].city)
                setRating(user['sendUser'].rating)
                setNumOfRating(user['sendUser'].numOfRating)
                return;

            } else {
                console.log('no user');
            }
        });
    }

    const getUserItems = async () => {
        await fetch('http://localhost:3001/item/getitembyuser/' + userID)
        .then((res) => res.json())
        .then((json) => {
            setItems(json)
        })
    }

    const handleDetails =  async (itemID) => {
        await fetch('http://localhost:3001/item/' + itemID,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => res.json())
        
        history.push('/itemdetails/'+itemID,{
            item: itemID
        })
    }

    useEffect(() => {
        getUser()
        getUserItems()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <NavBar/>
            <Container component="main" maxWidth="lg">
                <CssBaseline/>
                <Grid 
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '80vh' }}>
                    <Card sx={{ width: 350 }} variant="outlined">
                      <CardContent>
                          <Grid
                              container
                              spacing={0}
                              direction="column"
                              alignItems="center"
                              justifyContent="center"
                          >
                          <h3>פרטי המוכר:</h3>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={imgProfile}
                                    sx={{width: 80, height: 80}}/>

                            <Rating name="rating" value={rating/numOfRating} precision={0.5} dir={"ltr"} readOnly />
                          </Grid>
                          <Typography variant="body2" color="text.secondary">
                              <b><br/> שם המוכר:</b> {firstName + " " + lastName} <br/><br/>
                              <b>מיקום: </b> {city} <br/><br/>
                              <b>דרכי התקשרות: </b> {email}
                          </Typography>
                      </CardContent>
                    </Card>
                </Grid>

                <Typography variant="h4"> הפריטים של {firstName} </Typography>
                <Grid sx={{ flexGrow: 1 }} style={{marginTop:'80px'}}>
                    <Grid item xs={8}>
                        <Grid container justifyContent="center"  gap={4}>
                        {items.length?
                            items.map((item, i) => (
                            <div className="col-sm-3" key={i}>
                                <Card>
                                <Typography  variant="inherit" textAlign={'center'}>{item.name}</Typography>
                                    <Button
                                        onClick={handleDetails.bind(this,item._id)}
                                        sx={{height:330}}>
                                    <img src={item.image}
                                        alt='item_img'
                                        width={200}
                                    />
                                    </Button>
                                </Card>
                            </div>
                            )) : <p><br/>אין פריטים עדיין...</p>}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

