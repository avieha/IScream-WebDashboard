import React ,{useState, useEffect} from 'react'
import NavBar from '../components/NavBar'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import {useHistory} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';


const theme = createTheme();

export default function SearchPage(){
    const history=useHistory();
    const [items, setItems] = useState([]);
    const [query,setQuery] = useState('')
    const [genere,setGenere] = useState('')
    const [type,setType] = useState('')

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
  
    const types = [
        'ספר',
        'משחק וידיאו'
    ];

    const getAllItems = async () => {
        await fetch('http://localhost:3001/item/allitem')
            .then((res) => res.json())
            .then((json) => {
                setItems(json)
            })
    }

    const handleDetails =  async (itemID) => {
        await fetch('http://localhost:3001/item/' + itemID,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((json) => {
                // console.log(json)
            })
        history.push('/itemdetails/'+itemID,{
            item: itemID
        })
    }

    const search = () => {
        return items.filter((item) => 
                item.name.toLowerCase().includes(query) &&
                (genere.length? item.genre.indexOf(genere) >= 0  :item.genre.includes(genere) >= 0) &&
                item.item_type.includes(type))
                
    }

    useEffect(() => {
        getAllItems()
    }, []);

    const onGenereChange = (event, value, reason) => {
        if(reason === "clear")
            setGenere('') 
        else
            setGenere(value)
       };

    const onTypeChange = (event, value, reason) => {
        if(reason === "clear")
            setType('') 
        else 
            if(value == "ספר")
                    setType("book")
                else
                    setType("video game")
           
       };


    return(
    <ThemeProvider theme={theme}>
        <NavBar/>
        <Container component="main" maxWidth="lg" >
        <CssBaseline/>
            <Grid container justifyContent="center" marginTop={'10px'} gap={1}>
                <TextField type={'search'} placeholder={'שם הספר'} onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
                <Autocomplete
                    disablePortal
                    id="combo-box-genere"
                    options={genres}
                    sx={{ width: 170 }}
                    renderInput={(params) => <TextField {...params} placeholder="ז'אנר" />}
                    onChange={onGenereChange}
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-type"
                    options={types}
                    sx={{ width: 170 }}
                    renderInput={(params) => <TextField {...params} placeholder="סוג פריט" />}
                    onChange={onTypeChange}
                />
            </Grid>     
            <Grid sx={{ flexGrow: 1 }} style={{marginTop:'80px'}}>
                <Grid item xs={8}>
                    <Grid container justifyContent="center"  gap={4}>
                    {items.length?
                        search().map((item, i) => (
                        <div className="col-sm-3" key={item._id}>
                            <Card>
                            <Typography  variant="inherit" textAlign={'center'}>{item.name}</Typography>
                                <Button
                                    onClick={handleDetails.bind(this,item._id)}
                                    sx={{height:330}}>
                                <img src={item.image}
                                    alt='item_img'
                                    width={200}
                                />
                                </Button>
                            </Card>
                        </div>
                        )) : <p><br/>אין פריטים עדיין...</p>}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </ThemeProvider>
    )


}