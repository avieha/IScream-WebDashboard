import * as React from 'react';
import { login } from '../utils';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Home from './Home';
import {Route, useHistory} from 'react-router-dom';
import App from '../App'
import logo from '../swapy.jpeg'
import { CardMedia } from '@mui/material';
import { UserContext } from "../context/userContext";
import { userReducer } from "../context/userReducer";
import { useContext, useRef ,useReducer} from "react";
import {loginCall} from '../apiCalls';
const theme = createTheme();
/**
 * User login page
 * @returns {JSX.Element}
 * @constructor
 */
export default function SignIn() {
    const email = useRef();
    const password = useRef();
    //const initVal= useContext(UserContext);
   // const [isFetching, dispatch] = useReducer(userReducer, initVal)
    const {isFetching, dispatch}= useContext(UserContext);
    const history=useHistory();


    // Withdrawing data from the database and moving to the home page via mail
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get('email') === '' || data.get('password') === '') {
            console.log('error')
        } else {
            const user = {
                "email": data.get('email'),
                "password": data.get('password')
            }
            dispatch({type: "LOGIN_START"});
            const callBackApiUser = await loginCall({
                user,
                dispatch
            });
            if(callBackApiUser.message === "Auth successful")
            {
                dispatch({ type: "LOGIN_SUCCESS", payload: callBackApiUser });
                 history.push('/home');
            }
            else{
                alert("Auth faild")
            }

         }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{

                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <CardMedia
                        component="img"
                        height="125"
                        image={logo}
                        alt="green iguana"
                    />
                    <Typography component="h1" variant="h5" align='center' sx={{width: 550}}>
                        ברוכים הבאים לאתר החברתי
                        להחלפת משחקים וספרים בין אנשים
                        על מנת להיכנס יש להתחבר / להירשם
                    </Typography>
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="כתובת אימייל"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="סיסמה"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel align='center'
                            control={<Checkbox value="remember" color="primary"/>}
                            label="זכור אותי"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            התחבר
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"אין לך משתמש? הירשם"}
                                </Link>

                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}