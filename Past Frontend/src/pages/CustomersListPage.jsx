import { filter } from "lodash";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
// material
import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    LinearProgress,
    TableContainer,
    TablePagination
} from "@mui/material";
// components
import Page from "../components/general/Page";
import Label from "../components/general/Label";
import Scrollbar from "../components/general/Scrollbar";
import Iconify from "../components/general/Iconify";
import SearchNotFound from "../components/general/SearchNotFound";
import { UserListHead } from "../components/user";
import config from "../config";
import {fDateTimeSuffix} from "../utils/formatTime";

const GET_CUSTOMERS_URL = `${config.messageBrokerURL}/api/customers`;
// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: "id", label: "תעודת זהות", alignRight: true },
    { id: "name", label: "שם מלא", alignRight: true },
    { id: "phone", label: "טלפון", alignRight: true },
    { id: "age", label: "גיל", alignRight: true },
    { id: "gender", label: "מין", alignRight: true },
    { id: "city", label: "עיר", alignRight: true },
    { id: "product", label: "מוצר", alignRight: true },
    { id: "lang", label: "שפה", alignRight: true },
    { id: "prevCalls", label: "שיחות החודש", alignRight: true },
    { id: "createdAt", label: "תאריך יצירה", alignRight: true },
    { id: "updatedAt", label: "עדכון אחרון", alignRight: true },
];

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(
            array,
            (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function CustomersListPage() {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState("desc");
    const [orderBy, setOrderBy] = useState("updatedAt");
    const [filterName, setFilterName] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [customersList, setCustomersList] = useState([]);
    const [count, setCount] = useState(0);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - count) : 0;

    const fetchCustomers = async () => {
        console.log("fetchCustomers");
        const url = `${GET_CUSTOMERS_URL}?page=${page}&limit=${rowsPerPage}&sort=${orderBy}&order=${order}`;
        try {
            const response = await axios.get(url);
            setCustomersList(response.data.customers);
            setCount(response.data.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, [page, rowsPerPage, orderBy, order]);

    return (
        <Page title="לוח נתוני לקוחות | CallCenter">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        נתוני לקוחות
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={fetchCustomers}
                        startIcon={<Iconify icon="el:refresh" style={{ marginLeft: "20px" }} />}
                        size="large"
                        style={{ width: "12rem" }}
                    >
                        רענן רשימה
                    </Button>
                    <Typography variant="h6" gutterBottom>
                        מספר לקוחות רשומים במערכת:
                        <Typography align="center">{count.toLocaleString()}</Typography>
                    </Typography>
                </Stack>

                <Card>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={count}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {customersList.map((row) => {
                                        const {
                                            id,
                                            name,
                                            phone,
                                            age,
                                            city,
                                            gender,
                                            product,
                                            lang,
                                            prevCalls,
                                            createdAt,
                                            updatedAt,
                                        } = row;

                                        return (
                                            <TableRow
                                                hover
                                                key={id}
                                                tabIndex={-1}
                                                role="checkbox"
                                            >
                                                <TableCell align="right">{id}</TableCell>
                                                <TableCell align="right">{name}</TableCell>
                                                <TableCell align="right">{phone}</TableCell>
                                                <TableCell align="right">{age}</TableCell>
                                                <TableCell align="right">{gender}</TableCell>
                                                <TableCell align="right">{city}</TableCell>
                                                <TableCell align="right">{product}</TableCell>
                                                <TableCell align="right">{lang}</TableCell>
                                                <TableCell align="center">{prevCalls}</TableCell>
                                                <TableCell align="center">{fDateTimeSuffix(createdAt)}</TableCell>
                                                <TableCell align="center">{fDateTimeSuffix(updatedAt)}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                {!count && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={11} sx={{ py: 3 }}>
                                                <LinearProgress />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[25, 50, 100, 500, 1000]}
                        component="div"
                        count={count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="מספר שורות בעמוד"
                    />
                </Card>
            </Container>
        </Page>
    );
}
