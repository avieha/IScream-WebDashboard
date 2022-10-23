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

const theme = createTheme();

export default function TradeDetails(props){
    const trade = props.location.state.trade
    const [choosenitem, setChoosenItem] = useState('');
    const history=useHistory();

    const handleApprove = async () => {
        await fetch('http://localhost:3001/trade/approve/' + trade._id,{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        }
    })
        afterApproved()
        history.push('/mytrades')
    };

    const afterApproved = async () => {
        await fetch('http://localhost:3001/item/updateitem/' + trade.item_id._id,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                trade_completed : true
            })
        })

        await fetch('http://localhost:3001/item/updateitem/' + choosenitem,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                trade_completed : true
            })
        })
    }

    const handleChange = (e) => {
        setChoosenItem(e.target.id)
    }

    return(
      <div>
          <ThemeProvider theme={theme}>
              <NavBar/>
              <Container component="main" maxWidth="xs" >
                <CssBaseline/>
                <h1 style={{textAlign: 'center'}}>פרטי העסקה</h1>
                    <Grid  >
                        <Typography gutterBottom variant="h5" component="div" marginTop={2} >
                            הפריט המבוקש
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
                            <img src={trade.item_id.image}
                                width="200" 
                                height="250" /> 
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary">
                            <b>שם הפריט:</b> {trade.item_id.name}
                        </Typography>
                    </Grid>
                    
                    <Grid>
                        <Typography gutterBottom variant="h5" component="div" marginTop={10} >
                            מוצעים בתמורה
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
                            {trade.items_to_trade.map((item) => (
                             <Paper elevation={3} key={item._id}>
                                <Typography variant="h6" color="bold" textAlign={'center'}>
                                    {item.name}   
                                </Typography>  
                                <div className="radio-buttons" >
                                    <input
                                    id={item._id}
                                    choosenitem={item._id}
                                    name="item_id"
                                    type="radio"
                                    style={{ marginBottom:"5px"}}
                                    onChange={handleChange}
                                    />
                                    <img src={item.image}
                                        width="200" 
                                        height="250" /> 
                                </div>
                            </Paper>
                                   
                            ))}
                            
                            </Box>
                    </Grid>
                    <Button variant="contained" onClick={handleApprove}
                     style={{marginRight:"84px"}}>אשר החלפה </Button>
              </Container>
          </ThemeProvider>
      </div>
    );
}