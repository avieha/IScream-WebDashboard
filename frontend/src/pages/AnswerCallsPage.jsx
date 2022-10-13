import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import io from "socket.io-client";
import { faker } from "@faker-js/faker";
import axios from "axios";

import {
    Card,
    Table,
    Stack,
    Button,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
    Slider,
    TableFooter,
    Collapse,
    TextField,
    MenuItem,
} from "@mui/material";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// components
import NewCall from "../components/answerCalls/NewCall";
import Page from "../components/general/Page";
import Scrollbar from "../components/general/Scrollbar";
import Iconify from "../components/general/Iconify";
import { UserListHead } from "../components/user";

import { getCurrentHour, formatTime } from "../utils/formatTime";
import config from "../config";
// ----------------------------------------------------------------------

const START_SIMULATOR_URL = `${config.messageBrokerURL}/api/startSimulator`;
const STOP_SIMULATOR_URL = `${config.messageBrokerURL}/api/stopSimulator`;
const GET_SIMULATOR_STATUS_URL = `${config.messageBrokerURL}/api/SimulatorStatus`;
const SET_SIMULATOR_RATE_URL = `${config.messageBrokerURL}/api/SimulatorRate`;
const GET_ALL_CALLS_URL = `${config.StreamLayerURL}/api/calls`;

const TABLE_HEAD = [
    { id: "name", label: "שם", alignRight: true },
    { id: "start_time", label: "זמן התחלה", alignRight: true },
    { id: "end_time", label: "זמן סיום", alignRight: true },
    { id: "duration", label: "דקות שיחה", alignRight: true },
    { id: "phone", label: "טלפון", alignRight: true },
    { id: "city", label: "עיר", alignRight: true },
    { id: "age", label: "גיל", alignRight: true },
    { id: "gender", label: "מין", alignRight: true },
    { id: "product", label: "מוצר", alignRight: true },
    { id: "lang", label: "שפה", alignRight: true },
    { id: "topic", label: "נושא", alignRight: true }
];

const marks = [
    {
        value: 1,
        label: "כל שנייה"
    },
    {
        value: 3,
        label: "כל 3 שניות"
    },
    {
        value: 5,
        label: "כל 5 שניות"
    },
    {
        value: 7,
        label: "כל 7 שניות"
    },
    {
        value: 9,
        label: "כל 9 שניות"
    }
];

const PERIODS = ["יום רגיל", "סוף שבוע", "ערבי שבתות וחגים", "חופשות", "ימי קיץ"];

// ----------------------------------------------------------------------

const socket = io(config.StreamLayerURL, {
    transports: ["websocket", "polling"],
    reconnectionAttempts: 2
});

export default function AnswerCallsPage() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [activeCalls, setActiveCalls] = useState([]);
    const [lastCalls, setLastCalls] = useState([]);
    const [isAuto, setIsAuto] = useState(false);
    const [simulatorRate, setSimulatorRate] = useState(0);
    const [period, setPeriod] = useState("יום רגיל");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleNewCall = () => {
        setActiveCalls([
            {
               // id: faker.phone.phoneNumber("#########"),
                name: "",
                // start_time: Date.now(),
               // end_time: "",
              //  phone: faker.phone.phoneNumber("05########"),
                age: "",
                gender: "זכר",
                city: "",
                product: "וניל",
                lang: "עברית",
                topic: "הצטרפות",
                period
            },
            ...activeCalls
        ]);
        console.log("activeCalls", activeCalls);
    };

    const handleToggleAuto = async () => {
        if (simulatorRate) {
            await fetch(STOP_SIMULATOR_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setSimulatorRate(0);
        } else {
            await fetch(START_SIMULATOR_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setSimulatorRate(1);
        }
        console.log("generatorRate", simulatorRate);
    };

    const handleSpeedChange = (event, speed) => {
        console.log(speed);
        setSimulatorRate(speed);
        fetch(`${SET_SIMULATOR_RATE_URL}?rate=${speed}`, { method: "post" });
    };

    const fetchSimulatorStatus = async () => {
        try {
            const { data } = await axios.get(GET_SIMULATOR_STATUS_URL);
            setSimulatorRate(data.simulatorRate);
        } catch (error) {
            console.log(error);
            setSimulatorRate(0);
        }
    };

    const fetchAllCalls = async () => {
        try {
            const response = await axios.get(GET_ALL_CALLS_URL);
            setLastCalls(response.data);
            console.log("lastCalls", response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllCalls();
        fetchSimulatorStatus();
        socket.on("last_call", (data) => {
            console.log("newCall", data);
            setLastCalls((prev) => [data, ...prev]);
        });
    }, []);

    return (
        <Page title="הזמנת גלידה | CallCenter">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        הזמנת גלידה
                    </Typography>
                    {/* <Stack direction="row">
                        <TextField label="מספר שיחות ממתינות כרגע" size="small" shrink type="number"/>
                        <Button variant="contained" color="primary" size="small" mx={2}>
                            שלח
                        </Button>
                        <TextField
                            value={period}
                            label="סוג תקופה"
                            size="small"
                            select
                            onChange={(e) => setPeriod(e.target.value)}
                        >
                            {PERIODS.map((p) => (
                                <MenuItem key={p} value={p}>
                                    {p}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack> */}
                </Stack>
                {simulatorRate < 1 ? (
                    <>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            mb={5}
                        >
                            <Button variant="contained" onClick={handleToggleAuto}>
                                הפעל מצב סימולטור אוטומטי
                            </Button>
                        </Stack>

                        <Card>
                            <Scrollbar>
                                <TableContainer sx={{ minWidth: 300 }}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell
                                                    align="center"
                                                    colSpan={9}
                                                    sx={{ py: 3 }}
                                                >
                                                    <Button
                                                        variant="outlined"
                                                        onClick={handleNewCall}
                                                        startIcon={
                                                            <Iconify
                                                                icon="game-icons:ice-cream-scoop"
                                                                style={{ marginLeft: "20px" }}
                                                            />
                                                        }
                                                    >
                                                        הזמנה חדשה
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            <TransitionGroup>
                                                {activeCalls.map((data, index) => (
                                                    <Collapse key={data.id}>
                                                        <NewCall
                                                            key={data.id}
                                                            id={data.id}
                                                            data={data}
                                                            setActiveCalls={setActiveCalls}
                                                        />
                                                    </Collapse>
                                                ))}
                                            </TransitionGroup>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Scrollbar>
                        </Card>
                    </>
                ) : (
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={5}
                    >
                        <Slider
                            isRtl
                            max={9}
                            min={1}
                            step={2}
                            marks={marks}
                            onChangeCommitted={handleSpeedChange}
                            sx={{ width: "60%" }}
                        />
                        <Button variant="contained" color="error" onClick={handleToggleAuto}>
                            כבה מצב אוטומטי
                        </Button>
                    </Stack>
                )}
                {/* <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={3}
                    mt={10}
                >
                    <Typography variant="h4" gutterBottom>
                        שיחות אחרונות
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={fetchAllCalls}
                        startIcon={<Iconify icon="el:refresh" style={{ marginLeft: "20px" }} />}
                        size="large"
                        style={{ width: "12rem" }}
                    >
                        רענן רשימה
                    </Button>
                </Stack>
                <Card>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead headLabel={TABLE_HEAD} rowCount={lastCalls.length} />
                                <TableBody>
                                    {lastCalls
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <TableRow
                                                hover
                                                key={row.id}
                                                tabIndex={-1}
                                                role="contentinfo"
                                                dir="rtl"
                                            >
                                                <TableCell align="right">{row.name}</TableCell>
                                                <TableCell align="right">
                                                    {formatTime(row.start_time)}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {formatTime(row.end_time)}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.duration.toFixed(2)}
                                                </TableCell>
                                                <TableCell align="right">{row.phone}</TableCell>
                                                <TableCell align="right">{row.city}</TableCell>
                                                <TableCell align="right">{row.age}</TableCell>
                                                <TableCell align="right">{row.gender}</TableCell>
                                                <TableCell align="right">{row.product}</TableCell>
                                                <TableCell align="right">{row.lang}</TableCell>
                                                <TableCell align="right">{row.topic}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={lastCalls.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="מספר שורות בעמוד"
                    />
                </Card> */}
            </Container>
        </Page>
    );
}
