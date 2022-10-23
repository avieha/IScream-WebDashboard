import React, {useState } from "react";
import {getId} from '../utils';
import Button from "@mui/material/Button";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import { useContext} from "react";
import { UserContext } from "../context/userContext";

//const userID = getId();

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

const fabStyle = {
    margin: 'center',
    top: 1,
    center: 20,
    position: 'absoulte',
    marginRight: 80,
    marginBlockEnd: -30,
    // marginTop: 0
};

// for image upload
const Input = styled('input')({
    display: 'none',
});

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

export default function AddNewItem() {
    const {user} = useContext(UserContext);
    const userID = user.id

    // Handling '+' button
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
        clearState();
    };

    // Clear all fields after exiting Dialog
    const clearState = () => {
        setItemType('');
        setItemName('');
        setItemCondition('');
        setauthor('');
        setconsole('');
        setgenre([]);
        setdescription('');
        setFileInputState('');
        setPreviewSource('');
        setSelectedFile('');
    };


    // state for every field
    const [itemType, setItemType] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemCondition, setItemCondition] = useState('');
    const [author, setauthor] = useState('');
    const [genre, setgenre] = useState([]);
    const [console, setconsole] = useState('');
    const [description, setdescription] = useState('');
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    // state for error
    const [inputInvalidtype, setInputInvalidtype] = useState();
    const [inputerrortype, setInputerrortype] = useState(false);

    const [inputInvalidname, setInputInvalidname] = useState();
    const [inputerrorname, setInputerrorname] = useState(false);

    const [inputInvalidcond, setInputInvalidcond] = useState();
    const [inputerrorcond, setInputerrorcond] = useState(false);

    const [inputInvalidimg, setInputInvalidimg] = useState();
    const [inputerrorimg, setInputerrorimg] = useState(false);

    // update fields
    const typeUpdate = (event) => { // Dealing with type field changes to update our state
        setItemType(event.target.value);
        setInputInvalidtype('');
        setInputerrortype(false);
    }
    const nameUpdate = (event) => { // Dealing with name field changes to update our state
        setItemName(event.target.value)
        setInputInvalidname('');
        setInputerrorname(false);
    }
    const conditionUpdate = (event) => { // Dealing with condition field changes to update our state
        setItemCondition(event.target.value)
        setInputInvalidcond('');
        setInputerrorcond(false);
    }
    const authorUpdate = (event) => { // Dealing with author field changes to update our state
        setauthor(event.target.value)
    }
    const genreUpdate = (event) => { // Dealing with genre field changes to update our state
        const {
            target: {value},
        } = event;
        setgenre(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }
    const consoleUpdate = (event) => { // Dealing with console field changes to update our state
        setconsole(event.target.value)
    }
    const descriptionUpdate = (event) => { // Dealing with description field changes to update our state
        setdescription(event.target.value)
    }
    // Dealing with image field changes to update our state
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setInputInvalidimg('');
        setInputerrorimg(false);
        setFileInputState(event.target.value);
    };
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    // image upload to cloudinary and add item to mongo after the upload
    const imageUpdate = (base64EncodedImage, bodyjson) => {
        try {
            const img = JSON.stringify({data: base64EncodedImage})
            fetch("http://localhost:3001/imageItem/uploadItem", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: img,
            }).then(function (response) {
                return response.json();
            }).then(function (result) {
                if (result.message === "Image Upload success") {
                    bodyjson = { ...bodyjson , image : result.url, image_public_id : result.public_id};
                    fetch('http://localhost:3001/item/additem/' + userID, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(bodyjson)
                    })
                        .then((res) => {
                            if (res.status === 409) {
                                alert('כבר קיים פריט כזה במערכת, אנא נסה להעלות פריט אחר');
                                const onlyPublicId = String(bodyjson.image_public_id).replace("book_img/", "");
                                fetch("http://localhost:3001/imageItem/deleteItem/"+onlyPublicId,{
                                    method: "DELETE",
                                    headers: {
                                        'Content-Type': 'application/json',
                                    }
                                })
                            } else {
                                // Once posted, the user will be notified
                                alert('נוסף פריט חדש למערכת!');
                            }
                        })
                        .then(() => {
                                window.location.reload(false);
                            },
                            setOpen(false))
                    setFileInputState('');
                    setPreviewSource('');
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

    // validate rquiered fields
    function validation(jsonreq) {
        if (jsonreq.item_type === "") {
            setInputInvalidtype("דרוש סוג מוצר");
            setInputerrortype(true);
            return false;
        }
        if (jsonreq.name === "") {
            setInputInvalidname("דרוש שם");
            setInputerrorname(true);
            return false;
        }
        if (jsonreq.item_condition === "") {
            setInputInvalidcond("דרוש מצב מוצר");
            setInputerrorcond(true);
            return false;
        }
        // console.log(jsonreq);
        return true;
    }

    const handleSubmit = async () => {
        let bodyjson = { // We should keep the fields consistent for managing this data later
            item_type: itemType,
            name: itemName,
            item_condition: itemCondition,
            author: author,
            genre: genre,
            console: console,
            description: description
        }

        let flag = validation(bodyjson);
        if (flag) {
            if (!selectedFile) {
                setInputInvalidimg("דרוש להעלות תמונה");
                setInputerrorimg(true);
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend =  async () => {
                imageUpdate(reader.result, bodyjson);
            };
            reader.onerror = () => {
                console.error('Failed upload an image to the cloud');
            };
        } else {
            // console.log('You have missing arguments!');
        }
    }

    return (
        <div>
            <Grid container justify="center">
            <Fab style={fabStyle}
                 color="primary"
                 aria-label="add"
                 variant="extended"
                 justify="center"
                 onClick={handleClickOpen}>
                <Tooltip title={"הוספת פריט חדש"}>
                    <AddIcon color="inherit"/>
                </Tooltip>
                הוספת פריט חדש
            </Fab>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>הוספת פריט חדש</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        בחר סוג מוצר ולאחר מכן מלא את כל הפרטים הדרושים.
                    </DialogContentText><br/>


                    <FormControl fullWidth>
                        <InputLabel required id="itemtype-select-label">סוג מוצר</InputLabel>
                        <Select
                            labelId="itemtype-select-label"
                            id="itemtype-select"
                            error={"" ? inputerrortype : undefined}
                            value={itemType}
                            label="itemType"
                            onChange={typeUpdate}
                        >
                            <MenuItem value="book">ספר</MenuItem>
                            <MenuItem value="video game">משחק וידאו</MenuItem>
                        </Select>
                        <FormHelperText error>{inputInvalidtype}</FormHelperText>
                    </FormControl><br/><br/>

                    <TextField fullWidth id="ProductName"
                               required onChange={nameUpdate}
                               error={inputerrorname}
                               helperText={inputInvalidname}
                               label="שם מוצר"
                               variant="outlined"/><br/><br/>

                    <FormControl fullWidth>
                        <InputLabel required id="itemCondition-select-label">מצב מוצר</InputLabel>
                        <Select
                            labelId="itemCondition-select-label"
                            id="itemCondition-select"
                            value={itemCondition}
                            label="itemCondition"
                            error={"" ? inputerrorcond : undefined}
                            onChange={conditionUpdate}
                        >
                            <MenuItem value="as new">כמו חדש</MenuItem>
                            <MenuItem value="used">משומש</MenuItem>
                            <MenuItem value="bad">לא טוב</MenuItem>
                        </Select>
                        <FormHelperText error>{inputInvalidcond}</FormHelperText>
                    </FormControl><br/><br/>
                    {(itemType === "book") ?
                    <TextField fullWidth id="author"
                               onChange={authorUpdate}
                               label="מחבר"
                               variant="outlined"/>
                       : null }
                    {(itemType === "book") ? <br/> : null }
                    {(itemType === "book") ? <br/> : null }
                    {(itemType === "book") ?
                    <FormControl fullWidth>
                        <InputLabel id="genre-multiple-checkbox-label">ז'אנר</InputLabel>
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
                    </FormControl>
                    : null}

                    {(itemType === "video game") ?
                        <FormControl fullWidth>
                            <InputLabel id="console-select-label">קונסולה</InputLabel>
                            <Select
                                labelId="console-select-label"
                                id="console-select"
                                value={console}
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
                        : null }

                    {(itemType !== "") ? <br/> : null }
                    {(itemType !== "") ? <br/> : null }

                    <TextField fullWidth id="description"
                               onChange={descriptionUpdate}
                               label="פרטים נוספים"
                               variant="outlined"/><br/><br/>

                    <Stack required direction="row" spacing={2}>
                        <label htmlFor="contained-button-file">
                            <Input
                                accept="image/*"
                                id="contained-button-file"
                                multiple type="file"
                                error={"" ? inputerrorimg : undefined}
                                value={fileInputState}
                                onChange={handleFileInputChange}
                            />
                            {previewSource && (
                                <img
                                    src={previewSource}
                                    alt="chosen"
                                    style={{height: '300px'}}
                                />
                            )}
                            <br/>
                            <Button variant="contained" component="span">
                                העלאת תמונה
                            </Button>
                            <FormHelperText error>{inputInvalidimg}</FormHelperText>
                        </label>
                    </Stack><br/><br/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>ביטול</Button>
                    <Button onClick={handleSubmit}>שלח</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}