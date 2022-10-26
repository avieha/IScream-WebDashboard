import {createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom';
import Button from "@mui/material/Button";
import {Typography, Container} from '@mui/material';
import axios from "axios";
// import TotalInventory from './TotalInventory'
import {Pie} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend, Title} from 'chart.js';
import TotalInventory from "../components/TotalInventory"
import CssBaseline from "@mui/material/CssBaseline";
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const theme = createTheme();

function Dashboard() {
    // return (
    //     <ThemeProvider theme={theme}>
    //         <CssBaseline/>
    //         <TotalInventory/>
    //     </ThemeProvider>
    // )
    return TotalInventory("http://localhost:3002/api/getAllInventory","http://localhost:3002/api/getTastes");
    // return effect;
}

export default Dashboard;