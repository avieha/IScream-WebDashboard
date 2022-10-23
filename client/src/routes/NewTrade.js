import React ,{useState, useEffect} from 'react'
import NavBar from '../components/NavBar'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useHistory} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useContext} from "react";
import { UserContext } from "../context/userContext";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';


//imports for RTL
import {prefixer} from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';

// const theme = createTheme();
//const userID = getId();

// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
    direction: 'rtl',
});



export default function TradeDetails(props){
    const {user} = useContext(UserContext);
    const userID = user.id

    const item = props.location.state.item
    const history=useHistory();
    const [MyItems, setItems] = useState([]);
    const [details, setDetails] = useState('');
    const [isEmpty, setEmpty] = useState(false);

    // Pass the checkbox name to the function
    function getCheckedBoxes(chkboxName) {
    var checkboxes = document.getElementsByClassName(chkboxName);
    var checkboxesChecked = [];
    for (var i=0; i<checkboxes.length; i++) {
       if (checkboxes[i].checked) {
          checkboxesChecked.push(checkboxes[i].value);
       }
    }
    // Return the array if it is non-empty, or null
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
  }

    const sendTrade = async (trade) => {
        await fetch("http://localhost:3001/trade/createTrade", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trade),
        }).then(function (response) {
            return response.json();
        })
            .then(function (trade) {
                if (trade.message === "new trade created") {
                    alert("הבקשה נשלחה בהצלחה!");
                    history.push('/home');
                } else
                    alert(trade.message);
            });
    }

    const handleSubmit = async () => {
        const toTrade = getCheckedBoxes("checkbox")
        if(toTrade){
            let bodyjson = {
                offered_by_id: userID,
                offered_to_id: item.user_id,
                item_id: item._id,
                items_to_trade : toTrade,
                status:'הצעה חדשה',
                details:details
            }    
            sendTrade(bodyjson)
        }
        else{
            alert("לא בחרת פריטים להחלפה");
        }

    };

    const handleDetails = (e) => {
        setDetails(e.target.value);
    }

    const handleClose = () => {
        history.push('/myitems')
      };

    const nonItems = () =>{
        return( 
            <Dialog
                open={true}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                  {"אין אפשרות לבצע החלפה!"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    לא נמצאו פריטים בספריה.<br></br>
                    על מנת לבצע החלפה ראשית יש להעלות פריט לספריה שלי. 
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>אישור</Button>
                </DialogActions>
            </Dialog>);       
    } 

    const getUserItems = async () => {
        await fetch('http://localhost:3001/item/getitembyuser/' + userID)
            .then((res) => res.json())
            .then((json) => {
                setItems(json)
        })

    }

    useEffect(() => {
        getUserItems()
    }, []);

    if(MyItems.length == 0){
        return nonItems()  
    }         
    else  
        return(
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <NavBar/>
                <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <h1 style={{textAlign: 'center'}}>הצעה חדשה</h1>
                    <Grid  >
                        <Typography gutterBottom variant="h6" component="div" marginTop={2} >
                        הפריט המבוקש: {item.name}
                        </Typography>
                        <h2 style={{textAlign: 'center'}}></h2>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                '& > :not(style)': {
                                m: 3,
                                width: 250,
                                height: 300,
                                },
                            }}
                            >
                            <img src={item.image}
                                width="200" 
                                height="250" /> 
                        </Box>
                    </Grid>
                    
                    <Grid>
                        <Typography gutterBottom variant="h5" component="div" marginTop={10} >
                            בחר פריט/ים להחלפה:
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                '& > :not(style)': {
                                m: 3,
                                width: 250,
                                height: 300,
                                },
                            }}
                            >
                            {MyItems.map((item) => (
                                        <Paper elevation={3} key={item._id}>
                                            <Typography variant="h6" color="bold" textAlign={'center'}>
                                                {item.name}   
                                            </Typography>  
                                            <div className="radio-buttons" >
                                                <input
                                                id={item._id}
                                                value={item._id}
                                                name="item_id"
                                                type="Checkbox"
                                                readOnly
                                                className='checkbox'
                                                />
                                                <img src={item.image}
                                                    width="200" 
                                                    height="250" /> 
                                            </div>
                                        </Paper>        
                                    ))}
                            </Box>
                            <TextField  
                            style={{marginTop:"10px",marginBottom:"20px"}} 
                            fullWidth 
                            label="פרטים נוספים" 
                            onChange={handleDetails}
                            id="details" />
                        </Grid>
                        <Button 
                            onClick={handleSubmit}
                            variant="contained" 
                            type="submit"
                            style={{marginRight:"84px"}} >הצע החלפה </Button>
                </Container>
            </ThemeProvider>
        </CacheProvider>
        ) ;
}