import React from 'react'
import {useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import NavBar from '../components/NavBar'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import {TextField} from '@mui/material';
import Grid from '@mui/material/Grid';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {useContext} from "react";
import {UserContext} from "../context/userContext";
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import validator from 'validator'
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

//imports for RTL
import {prefixer} from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';

// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
    direction: 'rtl',
});

// for genre field
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const genres = [
    'ילדים',
    'רומן',
    'מותחן',
    'דרמה',
    'מדע בדיוני',
    'פנטזיה',
    'קומדיה',
    'ספרות בלשית',
    'ספרות צבאית',
    'קומיקס',
    'ספרות זולה',
    'צ\'ק ליט'
];


/**
 * Profile page for show info about user
 * @returns {JSX.Element}
 * @constructor
 */
export default function Profile() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birth, setBirth] = React.useState('');
    const [genre, setgenre] = useState([]);
    const [consoles, setconsoles] = useState('');
    const [imgProfile, setImgProfile] = React.useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [city, setCity] = useState('');
    const [rating, setRating] = useState(0);
    const [numOfRating, setNumOfRating] = useState(0);
    const {user} = useContext(UserContext);
    const [cities,setCities] = useState([])


    const getUser = async () => {
        const id = user.id;
        await fetch("http://localhost:3001/user/" + id, {
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
                setBirth(user['sendUser'].birth)
                setImgProfile(user['sendUser'].imageProfile)
                setIsLoading(false);
                setCity(user['sendUser'].city)
                setgenre(user['sendUser'].genres)
                setconsoles(user['sendUser'].console)
                setRating(user['sendUser'].rating)
                setNumOfRating(user['sendUser'].numOfRating)
                return;

            } else {
                console.log('no user');
            }
        });
    }
    useEffect(() => {
        getUser()
    }, [])

    const  getCitiesList =  async () => {
        await fetch('https://raw.githubusercontent.com/royts/israel-cities/master/israel-cities.json')
            .then((res) => res.json())
            .then((json) => {
                setCities(json)
            })
    }

    useEffect(() => {
        getCitiesList()
    }, [])
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
        validateEmail(event)
    };
    const handleChangeFirstName = (event) => {
        setFirstName(event.target.value);
    };
    const handleChangeLastName = (event) => {
        setLastName(event.target.value);
    };
    const [birthError, setBirthError] = useState(null)
    const handleChangeBirth = (event) => {
        const current = new Date();
        if (current > event) {
            setBirthError(null)
            setBirth(event);
        } else {
            setBirthError("תאריך לא חוקי !!!")
        }
    };
    const [genreErrorinput, setGenreErrorinput] = useState()
    const genreUpdate = (event) => { // Dealing with genre field changes to update our state
        const {
            target: {value},
        } = event;
        var size = event.target.value.length;

        if (size !== 4) {
            setGenreErrorinput(null);
            setgenre(
                // On autofill we get a stringified value.
                typeof value === 'string' ? value.split(',') : value,
            );
        } else {
            setGenreErrorinput("נא לבחור 3 ז'אנרים בלבד");
        }
    }
    const consoleUpdate = (event) => { // Dealing with console field changes to update our state
        setconsoles(event.target.value)
    }

    // const getUrl = () => {
    //     return imgProfile.toString()
    // }
    useEffect(() => {
        //console.log(email)
    }, [email])


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [openCity, setOpenCity] = React.useState(false);

    const handleClickOpenCity = () => {
        setOpenCity(true);
    };

    const handleCloseCity = () => {
        setOpenCity(false);
    };
    const [emailError, setEmailError] = useState(null)
    const validateEmail = (e) => {
        var email = e.target.value

        if (validator.isEmail(email)) {
            setEmailError(null);

        } else {
            setEmailError('אימייל לא חוקי !!!')
        }
    }

    const changeUser = async () => {
        if (emailError === null && birthError === null) {
            await fetch('http://localhost:3001/user/updateUser/' + user.id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    city: city,
                    birth: birth,
                    genres: genre,
                    console: consoles,
                })
            }).then(function (response){
                return response.json()
            }).then(function (res){
                if(res.message === "user was updated successfully."){
                    alert("משתמש עודכן בהצלחה")
                }else{
                    alert("המשתמש לא עודכן !!!")
                }
            })
            handleClose()
        } else {
            alert("פריט לא חוקי !!!")
            handleClose()
        }

    }
    const [cityChange,setCityChange] =useState("")
    const changeCity = ()=>{
        return     <div>
            תרצה לשנות את העיר ?

            <Autocomplete
                id="city-select"
                sx={{ width: 188 }}
                options={cities}
                onChange={(event, value) => {setCityChange(value.name)}}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                    <Box component="li"  {...props}>
                        {option.name}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        fullWidth
                        {...params}
                        label={city}
                        inputProps={{
                            ...params.inputProps,
                        }}
                    />
                )}
            />
        </div>


    }
    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>

                <NavBar/>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <div>
                        {/* load spinner */}
                        <Backdrop
                            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                            open={isLoading}
                        >
                            <CircularProgress color="inherit"/>
                        </Backdrop>

                        <Box
                            sx={{
                                marginTop: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                            <Avatar
                                alt="Remy Sharp"
                                src={imgProfile}
                                sx={{width: 110, height: 110}}
                            />
                            <Rating sx={{mt: 2}} name="rating" value={rating / numOfRating} 
                                    precision={0.5} readOnly/>
                            <Box component="form"
                                 sx={{
                                     marginTop: 4,
                                     display: 'flex',
                                     flexDirection: 'column',
                                     alignItems: 'center',
                                     mt: 2
                                 }}>

                                <TextField
                                    className="emailColor"
                                    helperText={emailError}
                                    id="emailId"
                                    margin="normal"
                                    type="email"
                                    label="אימייל"
                                    multiline
                                    maxRows={1}
                                    value={email}
                                    onChange={handleChangeEmail}
                                    // onChange={(e) => validateEmail(e)}
                                />
                                <TextField
                                    id="outlined-multiline-flexible"
                                    margin="normal"
                                    label="שם פרטי"
                                    multiline
                                    maxRows={1}
                                    value={firstName}
                                    onChange={handleChangeFirstName}
                                />
                                <TextField
                                    id="outlined-multiline-flexible"
                                    margin="normal"
                                    label="שם משפחה"
                                    multiline
                                    maxRows={1}
                                    value={lastName}
                                    onChange={handleChangeLastName}
                                />
                                <TextField
                                    id="outlined-multiline-flexible"
                                    margin="normal"
                                    label="עיר"
                                    multiline
                                    maxRows={1}
                                    value={city}
                                    onClick={(e) => {
                                        setOpenCity(true);}}
                                    // onChange={handleChangeLastName}

                                />

                                <Dialog
                                    open={openCity}
                                    onClose={handleCloseCity}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {changeCity()}
                                    </DialogTitle>

                                    <DialogActions>
                                        <Button onClick={handleCloseCity}>בטל </Button>
                                        <Button onClick={() => {
                                           setCity(cityChange)
                                            handleCloseCity()
                                        }
                                        } autoFocus
                                                type="submit"
                                        >
                                            שנה
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                <Grid item xs={12} margin="normal"
                                      sx={{width: 184, mt: 2}}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="תאריך לידה"
                                            value={birth}
                                            onChange={(newValue) => {
                                                setBirth(newValue);
                                                handleChangeBirth(newValue)
                                            }}
                                            renderInput={(params) =>
                                                <TextField {...params} helperText={birthError}/>}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} margin="normal"
                                      sx={{width: 200, mt: 2}}>
                                    <Box>
                                <FormControl fullWidth>
                                    <InputLabel id="genre-multiple-checkbox-label">ז'אנר מועדף</InputLabel>
                                    <Select
                                        labelId="genre-multiple-checkbox-label"
                                        id="genre-multiple-checkbox"
                                        multiple
                                        value={genre}
                                        hidden={true}
                                        onChange={genreUpdate}
                                        input={<OutlinedInput label="genre"/>}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {genres.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox checked={genre.indexOf(name) > -1}/>
                                                <ListItemText primary={name}/>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText error>{genreErrorinput}</FormHelperText>
                                </FormControl>
                                    </Box>
                                </Grid>
                        <Grid item xs={12} margin="normal"
                              sx={{width: 180, mt: 2}}>
                            <Box>
                                <FormControl fullWidth>
                                    <InputLabel id="console-select-label">קונסולה מועדפת</InputLabel>
                                    <Select
                                        labelId="console-select-label"
                                        id="console-select"
                                        value={consoles}
                                        label="console"
                                        onChange={consoleUpdate}
                                    >
                                        <MenuItem value="PC">PC</MenuItem>
                                        <MenuItem value="PS4">PS4</MenuItem>
                                        <MenuItem value="PS5">PS5</MenuItem>
                                        <MenuItem value="Xbox One">Xbox One</MenuItem>
                                        <MenuItem value="Xbox 360">Xbox 360</MenuItem>
                                        <MenuItem value="Xbox Series X/S">Xbox Series X/S</MenuItem>
                                        <MenuItem value="Nintendo Switch">Nintendo Switch</MenuItem>
                                        <MenuItem value="Wii">Wii</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                                <Button sx={{mt: 2}} variant="outlined" size="large" color="inherit" onClick={(e) => {
                                    setOpen(true);
                                }}>
                                    שנה פרטים
                                </Button>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {"האם אתה רוצה לשנות את הפרטים ? "}
                                    </DialogTitle>

                                    <DialogActions>
                                        <Button onClick={handleClose}>בטל </Button>
                                        <Button onClick={() => {
                                            changeUser()
                                        }
                                        } autoFocus
                                                type="submit"
                                        >
                                            שנה
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Box>
                        </Box>
                    </div>
                </Container>
            </ThemeProvider>
        </CacheProvider>
    );
}

