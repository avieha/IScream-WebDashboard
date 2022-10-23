import * as React from 'react';
import  {useState, useEffect} from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import {logout,isLogin} from '../utils'
import {useHistory} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import {useContext, useRef, useReducer} from "react";
import {UserContext} from "../context/userContext";
import {userReducer} from "../context/userReducer";

/**
 * Nav Bar
 */
const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar({notic}) {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const {isFetching, dispatch} = useContext(UserContext);
    const {user} = useContext(UserContext);
    const [trades, setTrades] = useState([]);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const userID= user.id

//my propile
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    // close menu
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const handlelogoutClick = () => {
        // logout();
        dispatch({type: "LOGOUT"})
        history.push('/login')
    }
    // after click on profile icon go to profile page
    const handleMyProfile = () => {
        if (user) {
            history.push('/profile')
        } else {
            console.log('no')
        }
    }

    // after click on icon go to... functions
    const handelHome = () => {

        history.push('/home')
    }
    const handleMsg = () => {
        history.push('/message')
    }
    const handleTrades = () => {
        history.push('/mytrades')
    }
    const handleItems = () => {
        history.push('/myitems')
    }
    const handleSettings = () => {
        history.push('/settings')
    }

    const handelSearch = () => {
        history.push('/search')
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >

        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>

            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );
    const [conversations, setConversations] = useState([])
    const [count,setCount]=useState(0)
    const getGotNewMsg = async () => {
        var counter = 0 ;
        try {
            await fetch('http://localhost:3001/conversations/' + user.id, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((res) => res.json())
                .then((json) => {
                    json.map((c)=>{
                        if(c.members[0]===user.id){
                            counter+=c.newMsgOne
                        }else{
                            counter+=c.newMsgTwo
                        }
                    })
                    setCount(counter)
                    setConversations(json)
                })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getGotNewMsg()
    }, [])

    const getGotConv = async () => {
        await fetch('http://localhost:3001/trade/userGotTrade/' + userID)
            .then((res) => res.json())
            .then((json) => {
                setTrades(json)
            })
    }

    useEffect(() => {
        getGotConv()
    }, [])

    const refref = ()=>{
        if(notic === 1 ){
            return 0
        }
        else{
            return count
        }
    }
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Swapy
                    </Typography>
                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        <IconButton size="large" color="inherit" onClick={handelHome}>
                            <Badge color="error">
                                <Tooltip title="עמוד הבית">
                                    <HomeIcon/>
                                </Tooltip>
                            </Badge>
                        </IconButton>
                        <IconButton size="large" color="inherit" onClick={handelSearch}>
                            <Badge color="error">
                                <Tooltip title="חפש פריטים">
                                    <ManageSearchIcon/>
                                </Tooltip>
                            </Badge>
                        </IconButton>
                        <IconButton size="large" color="inherit" onClick={handleTrades}>
                            <Badge badgeContent={trades.length} color="error">
                                <Tooltip title="החלפות">
                                    <CompareArrowsIcon/>
                                </Tooltip>
                            </Badge>
                        </IconButton>
                        <IconButton size="large" color="inherit" onClick={handleItems}>
                            <Badge color="error">
                                <Tooltip title="הספריה שלי">
                                    <LibraryBooksIcon/>
                                </Tooltip>
                            </Badge>
                        </IconButton>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={handleMsg}>
                            <Badge badgeContent={refref()} color="error">
                            <Tooltip title="הודעות">
                                <MailIcon/>
                            </Tooltip>
                            </Badge>
                        </IconButton>
                        <Tooltip title="המשתמש שלי">
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                color="inherit"
                                onClick={handleMyProfile}
                            >
                                <AccountCircle />
                            </IconButton>
                        </Tooltip>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            onClick={handlelogoutClick}
                        >
                            <Tooltip title="התנתק">
                                <Badge color="error">
                                    <LogoutIcon/>
                                </Badge>
                            </Tooltip>
                        </IconButton>
                    </Box>
                    <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}