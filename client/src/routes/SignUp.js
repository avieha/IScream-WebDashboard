import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import logo from '../swapy.jpeg'
import {CardMedia} from '@mui/material';
import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {prefixer} from 'stylis';
import {useHistory} from 'react-router-dom';
import {useEffect, useState} from 'react'
import Alert from '../components/Alert';
import {UserContext} from "../context/userContext";
import {useContext} from "react";
import {loginCall} from '../apiCalls';
import validator from 'validator'
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import FormHelperText from '@mui/material/FormHelperText';
import Autocomplete from '@mui/material/Autocomplete';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


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
 * New user registration page and entry into the database via post
 **/
export default function SignUp() {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    // const [asset_id, setAsset] = useState('')
    const [cities, setCities] = useState([])
    const [city, setCity] = useState('')
    const [genre, setgenre] = useState([]);
    const [consoles, setConsoles] = useState('');
    const {dispatch} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);


    const getCitiesList = async () => {
        await fetch('https://raw.githubusercontent.com/royts/israel-cities/master/israel-cities.json')
            .then((res) => res.json())
            .then((json) => {
                setCities(json)
            })
    }

    useEffect(() => {
        getCitiesList()
    }, [])

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const uploadImage = async (base64EncodedImage, user) => {
        try {
            const img = JSON.stringify({data: base64EncodedImage})
            await fetch("http://localhost:3001/image/upload", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: img,
            }).then(function (response) {
                return response.json();
            }).then(function (result) {
                if (result.message === "Image Upload sucsses") {
                    user = {...user, imageProfile: result.url}
                    //user = { ...user , image : result.public_id}
                    signUpUser(user);
                    setFileInputState('');
                    setPreviewSource('');
                    setSuccessMsg('Image uploaded successfully');
                }
            });
        } catch (err) {
            setIsLoading(false)
            console.log(err)
            setErrMsg('Something went wrong!');
            alert('Something went wrong!')
        }
    };
    const signUpUser = async (user) => {
        const current = {
            "email": user.email,
            "password": user.password
        }
        await fetch("http://localhost:3001/user/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }).then(function (response) {
            return response.json();
        })
            .then(function (user) {
                if (user.message === "User created") {
                    alert("registarion succeeded");
                    // login(user.token, user.id);
                    loginFunc(current);
                } else
                    setIsLoading(false)
                alert(user.message);
            });
    }
    const loginFunc = async (user) => {
        dispatch({type: "LOGIN_START"});
        const callBackApiUser = await loginCall({
            user,
            dispatch
        });
        if (callBackApiUser.message === "Auth successful") {
            dispatch({type: "LOGIN_SUCCESS", payload: callBackApiUser});
            setIsLoading(false)
            history.push('/home');
        } else {
            alert("Auth faild")
        }
    }
    const history = useHistory();
    const handleSubmit = async (event) => {
            setIsLoading(true)
            event.preventDefault();
            const reader = new FileReader();
            if (selectedFile) {
                reader.readAsDataURL(selectedFile);
            }

            const data = new FormData(event.currentTarget);

            if (data.get('email') === '' || data.get('password') === '' || data.get('firstName') === '' ||
                data.get('lastName') === '' || data.get(genre) === '' || city.toString() === '' || sex.toString() === ''
                || birth.toString() === '' || data.get(consoles) === ''
            ) {
                setIsLoading(false)
                console.log('error')
                alert('Everything has to be filled')
            } else {
                if (selectedFile) {
                    const user = {
                        "email": data.get('email'),
                        "password": data.get('password'),
                        "firstName": data.get('firstName'),
                        "lastName": data.get('lastName'),
                        "birth": birth.toString(),
                        "sex": sex.toString(),
                        "city": city.toString(),
                        "genres": genre,
                        "console": consoles.toString(),
                        "rating": 0,
                        "numOfRating": 0
                    }
                    if (selectedFile) {
                        reader.onloadend = () => {
                            uploadImage(reader.result, user);
                        };
                    } else {
                        signUpUser(user);
                    }
                } else {
                    const user = {
                        "email": data.get('email'),
                        "password": data.get('password'),
                        "firstName": data.get('firstName'),
                        "lastName": data.get('lastName'),
                        "birth": birth.toString(),
                        "sex": sex.toString(),
                        "city": city.toString(),
                        "genres": genre,
                        "console": consoles.toString(),
                        "rating": 0,
                        "numOfRating": 0,
                        "imageProfile": 'https://res.cloudinary.com/dt9z5k8rs/image/upload/v1658258491/AVATAR_lhyz0n.webp'
                    }
                    signUpUser(user);
                }


                reader.onerror = () => {
                    setIsLoading(false)
                    console.error('AHHHHHHHH!!');
                    setErrMsg('something went wrong!');
                };
            }
        }
    ;

    const [sex, setSex] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSex(event.target.value.toString());
    };

    const [birth, setBirth] = React.useState(null);

    const [emailError, setEmailError] = useState('')
    const validateEmail = (e) => {
        var email = e.target.value

        if (validator.isEmail(email)) {
            setEmailError(null);

        } else {
            setEmailError('אימייל לא חוקי !!!')
        }
    }
    const [birthError, setBirthError] = useState('')
    const validateBirth = (event) => {
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
        setConsoles(event.target.value)
    }

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Backdrop
                        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                        open={isLoading}
                    >
                        <CircularProgress color="inherit"/>
                    </Backdrop>
                    <Box
                        sx={{
                            marginTop: 2,
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
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            הרשמה
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="שם פרטי"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="שם משפחה"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="כתובת אימייל"
                                        name="email"
                                        autoComplete="email"
                                        helperText={emailError}
                                        onChange={(e) => validateEmail(e)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="סיסמה"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        id="city-select"
                                        sx={{width: 300}}
                                        options={cities}
                                        autoHighlight
                                        onChange={(event, value) => setCity(value.name)}
                                        getOptionLabel={(option) => option.name}
                                        renderOption={(props, option) => (
                                            <Box component="li"  {...props}>
                                                {option.name}
                                            </Box>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                required
                                                fullWidth
                                                {...params}
                                                label="בחר עיר"
                                                inputProps={{
                                                    ...params.inputProps,
                                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="תאריך לידה"
                                            value={birth}
                                            onChange={(newValue) => {
                                                validateBirth(newValue)
                                                setBirth(newValue);
                                            }}
                                            renderInput={(params) => <TextField required {...params}
                                                                                helperText={birthError}/>}
                                        />
                                    </LocalizationProvider>

                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <Box>
                                        <FormControl fullWidth required>
                                            <InputLabel id="select-label">מין</InputLabel>
                                            <Select
                                                labelId="select-label"
                                                id="simple-select"
                                                value={sex}
                                                label="מין"
                                                onChange={handleChange}
                                                sx={{width: 120}}
                                            >
                                                <MenuItem value={'man'}>זכר</MenuItem>
                                                <MenuItem value={'woman'}>נקבה</MenuItem>
                                                <MenuItem value={'other'}>אחר</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>

                                </Grid>
                                <Grid item xs={8}>
                                    <Box>
                                        <FormControl fullWidth required>
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
                                <Grid item xs={7}>
                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel required id="console-select-label">קונסולה מועדפת</InputLabel>
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

                                <Grid item xs={12} mt={-1}>
                                    <Box>
                                        <div>
                                            <h4 className="title">העלאה תמונת פרופיל</h4>
                                            <Alert msg={errMsg} type="danger"/>
                                            <Alert msg={successMsg} type="success"/>
                                            <div className="form">
                                                <input
                                                    id="fileInput"
                                                    type="file"
                                                    name="image"
                                                    onChange={handleFileInputChange}
                                                    value={fileInputState}
                                                    className="form-input"
                                                />

                                            </div>
                                            {previewSource && (
                                                <img
                                                    src={previewSource}
                                                    alt="chosen"
                                                    style={{height: '300px'}}
                                                />
                                            )}
                                        </div>
                                    </Box>
                                </Grid>

                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}

                            >
                                הירשם
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        יש לך שם משתמש? התחבר
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </CacheProvider>
    );

}