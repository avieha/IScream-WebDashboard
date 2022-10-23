import {useEffect, useState} from "react";
import "./conversation.css";
import Badge from '@mui/material/Badge';

export default function Notfic({not}) {
    const [notfic, setNotfic] = useState(null)
    useEffect(() => {
        // const getUser = async () => {
        //     console.log("ok")
        // };
        // getUser();
    }, [])
    return (
        <div className="conversation">
            <Badge badgeContent={not} color="error"
                   anchorOrigin={{
                       vertical: 'top',
                       horizontal: 'right',
                   }}/>
        </div>
    );
}