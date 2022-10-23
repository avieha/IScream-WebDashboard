import {useEffect, useState} from "react";
import NavBar from '../components/NavBar'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import {useHistory} from 'react-router-dom';
import { useContext} from "react";
import { UserContext } from "../context/userContext";
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';


const theme = createTheme();

export default function ItemDetails(props) {

    const {user} = useContext(UserContext);
    const userID= user.id;

    const item = props.location.state.item;
    const [oneItem, setOneItem] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birth, setBirth] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [imgProfile, setImgProfile] = useState('');
    const [openDel, setopenDel] = useState(false);
    const history=useHistory();
    const [rating, setRating] = useState(0);
    const [numOfRating, setNumOfRating] = useState(0);

    const handleClickOpenDelete = () => {
        setopenDel(true);
    };

    const handleCloseDelete = () => {
        setopenDel(false);
    };

    const handleUser =  (userID) => {
        history.push('/userProfile',{
            user: userID
        })
    }

    const getOneItem = async () => {
        await fetch('http://localhost:3001/item/'+ item,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((json) => {
                setOneItem(json)
                fetch("http://localhost:3001/user/" + json.user_id, {
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
            })
    };

    const handleMakeTrade =  () => {
        history.push('/newTrade',{
            item: oneItem
        })
    }

    const handleDelete = () => {
        fetch('http://localhost:3001/item/' + item,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((json) => {
                setopenDel(false);
            })
        const onlyPublicId = String(oneItem.image_public_id).replace("book_img/", "");
        fetch("http://localhost:3001/imageItem/deleteItem/"+onlyPublicId,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json)
            })
        history.push('/')
        window.location.reload(false);
    }

    useEffect(() => {
        getOneItem();
    },[]);

    return (
          <ThemeProvider theme={theme}>
              <NavBar/>
              <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  style={{ minHeight: '100vh' }}
              >

                  <Grid item xs={3}>
              <div style={{fontFamily: 'Tahoma'}}>
                  <Grid
                      container
                      spacing={0}
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                  >
                      <h1>{oneItem.name}</h1>
                  <img src={oneItem.image}
                       alt='item_img'
                       width={200}
                  />
                  <br/><br/>
                  <Button
                      style={{ display: (oneItem.user_id === userID) ? 'none' : undefined }}
                      variant="contained"
                      // disabled={(oneItem.user_id !== userID) ? true : false }
                      onClick={handleMakeTrade.bind(this,item)}
                   >הצע החלפה</Button>
                  <br/><br/>
                <Card sx={{ width: 350 }} variant="outlined">
                    <CardContent>
                  <Typography variant="body2" color="text.secondary">
                      <b> סוג המוצר:</b> {(oneItem.item_type === "book") ? "ספר" : "משחק וידאו"}<br/><br/>
                      <b>מצב המוצר: </b>
                      {(oneItem.item_condition === "as new") ? "כמו חדש" :
                          (oneItem.item_condition === "used") ? "משומש" : "לא טוב"}<br/><br/>

                      {(oneItem.item_type === "book") ? <b>מחבר: </b> : null }
                      {(oneItem.item_type === "book") ? oneItem.author : null}
                      {(oneItem.item_type === "book") ? <br/> : null}
                      {(oneItem.item_type === "book") ? <br/> : null}

                      {(oneItem.item_type === "book") ? <b>ז'אנר: </b>  : null}
                      {(oneItem.item_type === "book") ? oneItem.genre.join(', ') : null}
                      {(oneItem.item_type === "book") ? <br/> : null}
                      {(oneItem.item_type === "book") ? <br/> : null}

                      {(oneItem.item_type === "video game") ? <b>קונסולה: </b> : null }
                      {(oneItem.item_type === "video game") ? oneItem.console : null}
                      {(oneItem.item_type === "video game") ? <br/> : null}
                      {(oneItem.item_type === "video game") ? <br/> : null}

                      <b>פרטים נוספים: </b> {(oneItem.description)}
                  </Typography>
                    </CardContent>
                </Card><br/><br/>
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
                            <IconButton onClick={handleUser.bind(this,oneItem.user_id)}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={imgProfile}
                                    sx={{width: 80, height: 80}}/>
                            </IconButton>

                            <Rating name="rating" value={rating/numOfRating} precision={0.5} dir={"ltr"} readOnly />
                          </Grid>
                          <Typography variant="body2" color="text.secondary">
                              <b><br/> שם המוכר:</b> {firstName + " " + lastName} <br/><br/>
                              <b>מיקום: </b> {city} <br/><br/>
                              <b>דרכי התקשרות: </b> {email}
                          </Typography>
                      </CardContent>
                  </Card><br/><br/>
                  </Grid>
                  <Grid
                      container
                      spacing={0}
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                  >
                  <Button
                      style={{ display: (oneItem.user_id !== userID) ? 'none' : undefined }}
                      variant="contained"
                      color="error"
                      // disabled={(oneItem.user_id !== userID) ? true : false }
                      onClick={handleClickOpenDelete}>
                      מחיקת פריט
                  </Button>
                  </Grid>
                  <Dialog
                      open={openDel}
                      onClose={handleCloseDelete}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                  >
                      <DialogTitle id="alert-dialog-title">
                          {"אישור מחיקת פריט"}
                      </DialogTitle>
                      <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                              האם את/ה בטוח/ה שברצונך למחוק פריט זה?
                          </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                          <Button onClick={handleCloseDelete}>לא</Button>
                          <Button onClick={handleDelete} autoFocus>
                              כן
                          </Button>
                      </DialogActions>
                  </Dialog>
              </div>
                  </Grid>
              </Grid>
          </ThemeProvider>

    )
}