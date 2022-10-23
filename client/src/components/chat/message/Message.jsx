import "./message.css";
import {format} from "timeago.js";
import {useEffect, useState} from "react";


export default function Message({message, own}) {
    const [currentUser , setCurrentUser] = useState()
    const getUser = async () => {
        try {
            await fetch('http://localhost:3001/user/' + message.sender, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((res) => res.json())
                .then((json) => {
                    setCurrentUser(json)
                })
        } catch (err) {
            console.log(err)
        }
    };
    useEffect(() => {
            getUser();
    }, [])
    return (
        <div className={own ? "message own" : "message"}>
            <div  className="messageTop">
                <img
                    className="messageImg"
                    src={currentUser?.sendUser["imageProfile"]}
                    alt=""
                />
                <p className="messageText">
                    {message.text}
                </p>
            </div>
            <div className="messageBottom">
                {format(message.createdAt)}
            </div>
        </div>
    );
}