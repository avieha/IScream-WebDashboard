import NavBar from '../components/NavBar'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import React, {useState, useEffect, useContext} from 'react'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import {useHistory} from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { UserContext } from "../context/userContext";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';


const theme = createTheme();

function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }


/**
 * MyTrades page
 * @returns {JSX.Element}
 * @constructor
 */
 export default function MyTrades(){

    const [trades, setTrades] = useState([]);
    const [myTrade, setTrade] = useState([]);
    const [value, setValue] = useState(0);
    const [toRender, needRender] = useState(false);
    const {user} = useContext(UserContext);
    const userID= user.id
    const history=useHistory();
    const [msg,setMsg]=useState('')
    const [conversation, setConversation] = useState(null);
    const [review, setReview] = useState(false);
    const [score, setScore] = useState(0);
    const [sentReview, setSentReview] = useState(false)
    const [tradeToReview, setTradeToReview] = useState([])
    const [conversations, setConversations] = useState([])
    // const [chat, setChat] = useState(null);

    // to handle with tab change
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleDecline =  (tradeID) => {
        needRender(!toRender)
         fetch('http://localhost:3001/trade/decline/' + tradeID,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            }
        })
      };

    const handleDetails =  (tradeID) => {
        setTrade(tradeID)
        history.push('/tradedetails',{
            trade: tradeID
        })
    }
    const getAllTrades = async () => {
        await fetch('http://localhost:3001/trade/userTrade/' + userID )
        .then((res) => res.json())
        .then((json) => {
          setTrades(json)
        })
    }

    const getSendTrades = async () => {
        await fetch('http://localhost:3001/trade/userSendTrade/' + userID)
        .then((res) => res.json())
        .then((json) => {
          setTrades(json)
        })
    }

    const getGotTrades = async () => {
        await fetch('http://localhost:3001/trade/userGotTrade/' + userID)
        .then((res) => res.json())
        .then((json) => {
          setTrades(json)
        })
    }

    const getFunc = () => {
        switch(value) {
            case 0:
                getGotTrades()
                break;
            case 1:
                getSendTrades()
                break;
            case 2:
                getAllTrades()
                break;
            default:
        }

    }
    useEffect(() => {
        getFunc()
    }, [value,toRender])

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setMsg("")
        setOpen(false);
    };

    const handleSend = (event) => {
        event.preventDefault();
        sendMessage()
    };

    const handleChangeRating = async () => {
        if(tradeToReview.offered_by_id._id != userID){
            var toBeReview = tradeToReview.offered_by_id._id
        }    
        else{
            var toBeReview = tradeToReview.offered_to_id._id
        }

        var rating, numOfRating

        await fetch("http://localhost:3001/user/" + toBeReview, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
            return response.json();
        }).then(function (user) {
            if (user) {
                rating = user['sendUser'].rating
                numOfRating = user['sendUser'].numOfRating
                return;
            } else {
                console.log('no user');
            }
        });

        await fetch('http://localhost:3001/user/' + toBeReview,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                rating : rating + score,
                numOfRating : numOfRating+1
            })
        })
        setSentReview(true)
        setReview(false)
    }

    const sendMessage =async (data) =>{
        if(msg){
            createConversation()
            setOpen(false);
        }
        else{
            alert("need fill message")
            setMsg('')
        }


    }
    const createConversation = async () => {
        try {
            await fetch('http://localhost:3001/conversations/' + user.id, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((res) => res.json())
                .then((json) => {
                    var flage = false;
                    var chat = null;
                    var currentChat=''
                        json.map((c)=>{
                            c.members.filter((x)=>{
                                if (x === tradeToReview.offered_to_id["_id"]) {
                                    flage=true;
                                    currentChat=c._id
                                    chat=c
                                }
                            }
                            )
                        })
                    if(flage){
                        createMessage(currentChat , )
                    }
                    else{
                        createNewConversation()
                    }
                })
        } catch (err) {
            console.log(err)
        }

    }
    const createNewConversation =async () => {
        const newConv = {
                           senderID:tradeToReview.offered_by_id._id,
                           receiverId:tradeToReview.offered_to_id._id
                       }
        await fetch("http://localhost:3001/conversations", {
                           method: "POST",
                           headers: {
                               'Content-Type': 'application/json',
                           },
                           body: JSON.stringify(newConv),
                       }).then(function (response) {
                           return response.json();
                       })
                           .then(function (conv) {
                               createMessage(conv._id , conv)
                           });

    }
    const createMessage = async (conv, chat) => {
        const newMessage = {
                sender: userID,
                text: msg,
                conversationId: conv,
        }
        await  fetch('http://localhost:3001/messages', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMessage)
        })
            .then((res) => res.json())
            .then((json) => {
                if(json._message === 'Message validation failed'){
                    console.log("no")
                }
                else{
                    addNewNotifMsg(conv, chat)
                    alert("הודעה נשלחה בהצלחה ")

                }

            })
    }
    const addNewNotifMsg = async (conversationId , chat) => {
        var one = chat.members[0];
        if (chat.members[0] === user.id) {
            await fetch('http://localhost:3001/conversations/updateConve/' + conversationId, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    $inc: {'newMsgTwo': 1}
                })
            })
        } else {
            await fetch('http://localhost:3001/conversations/updateConve/' + conversationId, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    $inc: {'newMsgOne': 1}
                })
            })
        }
    }

    const fillMsg = (event) => {
        setMsg(event.target.value)
    }
    return(
        <ThemeProvider theme={theme}>
            <NavBar/>
            <Container component="main" maxWidth="xs"  >
                <Box sx={{ width: '100%' }} >
                    <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
                        <LinkTab label="הצעות שהתקבלו" />
                        <LinkTab label="הצעות שנשלחו"  />
                        <LinkTab label="היסטוריית הצעות" />
                    </Tabs>
                </Box>
                <CssBaseline/>
                <Grid container spacing={5} paddingBottom='50px' paddingTop='10px'>
                {trades.length?
                  trades.map((trade) => ( 
                    <Grid item xs={6} sm={12} key={trade._id}>
                        <Card sx={{ maxWidth: 400 }}
                        style={{  minWidth: 275,
                            border: "1px solid",
                            padding: "10px",
                            boxShadow: "5px 10px grey"}} >
                            <CardMedia
                                component="img"
                                height="140"
                                image={trade.item_id.image}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                   {trade.item_id.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <b>שולח הבקשה:</b> { trade.offered_by_id.firstName} { trade.offered_by_id.lastName}<br/>
                                    <b>מקבל הבקשה:</b> { trade.offered_to_id.firstName} { trade.offered_to_id.lastName}<br/>
                                    <b>סטטוס:</b> { trade.status}<br/>
                                    <b>פרטים נוספים:</b> { trade.details }
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small"
                                disabled={(trade.status == 'הצעה חדשה') &&
                                          (trade.offered_by_id._id != userID)? false : true }
                                onClick={handleDetails.bind(this,trade)}>פרטי ההצעה</Button>

                                <Button size="small"
                                disabled={trade.status == 'הצעה חדשה'? false : true }
                                onClick={handleDecline.bind(this,trade._id)}>
                                    {(trade.offered_by_id._id != userID)? "סרב להצעה" : "בטל הצעה"} </Button>

                                {/*<Button size="small" onClick={handleClickOpen} > שלח הודעה </Button>*/}
                                <Button size="small" onClick={(e)=>{setOpen(true); setTradeToReview(trade); }} > שלח הודעה </Button>
                                {value == 2? <Button size="small" onClick={(e) => {setReview(true);setTradeToReview(trade);}} > דרג משתמש </Button>
                                :undefined}

                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {"כתוב הודעה "}
                                    </DialogTitle>
                                    <DialogContent>
                                            <TextField
                                                fullWidth
                                                sx={{width:'40ch'}}
                                                id="message"
                                                multiline
                                                rows={4}
                                                name="msgSend"
                                                onChange={fillMsg}
                                            />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>בטל </Button>
                                        <Button onClick={handleSend} autoFocus
                                            type="submit"
                                        >
                                            שלח
                                        </Button>
                                    </DialogActions>
                                </Dialog>

                                {/* review user dialog*/}
                                <Dialog
                                    open={review}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                    {"דרג את המשתמש.."}
                                    </DialogTitle>
                                    <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        <Rating name="rating" defaultValue={1}  
                                            onChange={(e) => setScore(Number(e.target.defaultValue))} dir={"ltr"} />
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleChangeRating} >אישור</Button>
                                    </DialogActions>
                                </Dialog>
                            </CardActions>
                        </Card>
                    </Grid>
                ))  : <p><br/>אין הצעות נוספות..</p>}
                </Grid>
            </Container>
        </ThemeProvider>
    )
}
