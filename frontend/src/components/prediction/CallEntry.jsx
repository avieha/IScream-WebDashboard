import { useState } from "react";
import {
    Button,
    TableRow,
    TableCell,
    TextField,
    Typography,
    MenuItem,
    Container,
    Card
} from "@mui/material";

const PRODUCTS = ["חלבה","לימון", "תות", "שוקולד", "וניל"];
const langs = [
    {
        value: "עברית",
        label: "עברית"
    },
    {
        value: "אנגלית",
        label: "אנגלית"
    },
    {
        value: "רוסית",
        label: "רוסית"
    },
    {
        value: "אמהרית",
        label: "אמהרית"
    }
];

export default function CallEntry({ callData, setCallData }) {

    const handleSubmit = () => {
        console.log(callData);
    };

    return (
        <TableRow key={callData.id} tabIndex={-1} role="contentinfo" dir="rtl">

            {/* טלפון */}
            <TableCell align="right" sx={{ width: "130px" }}>
                <Typography variant="button">{callData.phone}</Typography>
            </TableCell>

            {/* שם */}
            <TableCell align="right">
                <TextField
                    autoFocus
                    label="שם מלא"
                    type="text"
                    size="small"
                    onChange={(e) => {
                        setCallData({ ...callData, name: e.target.value });
                    }}
                />
            </TableCell>

            {/* עיר */}
            <TableCell align="right">
                <TextField
                    label="עיר"
                    type="text"
                    size="small"
                    onChange={(e) => {
                        setCallData({ ...callData, city: e.target.value });
                    }}
                />
            </TableCell>

            {/* גיל */}
            <TableCell align="right" sx={{ width: "100px" }}>
                <TextField
                    label="גיל"
                    type="number"
                    size="small"
                    onChange={(e) => {
                        setCallData({ ...callData, age: e.target.value });
                    }}
                />
            </TableCell>

            {/* מין */}
            <TableCell align="right">
                <TextField
                    value={callData.gender}
                    label="מין"
                    size="small"
                    select
                    onChange={(e) => {
                        setCallData({ ...callData, gender: e.target.value });
                    }}
                >
                    <MenuItem key="זכר" value="זכר">
                        זכר
                    </MenuItem>
                    <MenuItem key="נקבה" value="נקבה">
                        נקבה
                    </MenuItem>
                </TextField>
            </TableCell>

            {/* מוצרים */}
            <TableCell align="right">
                    <TextField
                        value={callData.product}
                        label="טעמים"
                        size="small"
                        name="product"
                        select
                       // onChange={handleChange}
                    >
                        {PRODUCTS.map((name) => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </TextField>
                </TableCell>
            {/* שפה */}
           {/* כמות */}
                      
           <TableCell align="right">
                    <TextField
                        required
                        label="כמות"
                        type="text"
                        size="small"
                        name="topic"
                       // onChange={handleChange}
                    />
                </TableCell>
        </TableRow>
    );
}
