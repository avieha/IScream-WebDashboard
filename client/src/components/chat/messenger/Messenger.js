import "./messenger.css";
import {useContext, useEffect, useRef, useState} from "react";
import Conversation from '../conversations/Conversation';
import Message from '../message/Message';
import ChatOnline from '../chatOnline/ChatOnline';
import {UserContext} from '../../../context/userContext'
import {io} from "socket.io-client";
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import React from "react";
import Notfic from '../conversations/Notfic';
import NavBar from '../../NavBar';

export default function Messenger() {
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const {user} = useContext(UserContext)
    const scrollRef = useRef();
    const [query, setQuery] = useState('')
    const [countNotif, setCountNotif] = useState(0)

    /**
     * Socket IO for chat
     */
    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user.id);
        socket.current.on("getUsers", users => {
        })
    }, [user])


    /**
     * Get converstions
     */
    const getConversations = async () => {
        try {
            await fetch('http://localhost:3001/conversations/' + user.id, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((res) => res.json())
                .then((json) => {
                    setConversations(json)
                })
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getConversations()
    }, [user.id])

    /**
     * Use effect for get current chat from mongodb
     */
    useEffect(() => {
        const getMessages = async () => {
            try {
                await fetch('http://localhost:3001/messages/' + currentChat?._id, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then((res) => res.json())
                    .then((json) => {
                        setMessages(json);
                    })
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);
    const addNewNotifMsg = async (conversationId) => {
        var one = currentChat.members[0];
        if (currentChat.members[0] === user.id) {
            await fetch('http://localhost:3001/conversations/updateConve/' + conversationId, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    $inc: {'newMsgTwo': 1}
                })
            })
        } else {
            await fetch('http://localhost:3001/conversations/updateConve/' + conversationId, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    $inc: {'newMsgOne': 1}
                })
            })
        }

    }

    /**
     * Handel submit for send msg
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user.id,
            text: newMessage,
            conversationId: currentChat._id,
        };
        addNewNotifMsg(currentChat._id)
        const receiverId = currentChat.members.find(
            (member) => member !== user.id
        );
        // send our msg
        socket.current.emit("sendMessage", {
            senderId: user.id,
            receiverId,
            text: newMessage,
        });

        try {
            await fetch('http://localhost:3001/messages', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message)
            })
                .then((res) => res.json())
                .then((json) => {
                    setMessages([...messages, json]);
                    setNewMessage("");
                })
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * use Effect for scroll down view auto of chat
     *
     */

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    const zeroNotifications = async (c) => {
        if (c?.members[0] === user.id && (c.newMsgOne !==0)) {
            await fetch('http://localhost:3001/conversations/updateConve/' + c._id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "newMsgOne": 0,
                })
            }).then(() => {
                    setCountNotif(1)
                    refresNavBar(0)
                }
            )
        } else if (c?.members[1] === user.id && (c.newMsgTwo !==0)) {
            await fetch('http://localhost:3001/conversations/updateConve/' + c._id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "newMsgTwo": 0,
                })
            }).then(() => {
                    setCountNotif(1)
                    refresNavBar(0)
                }
            )
        }
    }

    useEffect(() => {
        zeroNotifications(currentChat)
    })

    const badge = (c) => {
        return <Conversation conversation={c} currentUser={user} notic={countNotif}/>
    }
    const refresNavBar =  (a)=>{
        return  <NavBar notic={countNotif}/>
    }
    useEffect(()=>{
        refresNavBar(countNotif)
    },[countNotif])
    return (
        <div>

            {refresNavBar()}

            <div className="messenger">
                {/*------------------------------------------------------------------------------------------------------------*/}
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        {/*<TextField type={'search'} placeholder={'חפש חברים'} onChange={(e) => setQuery(e.target.value.toLowerCase())}/>*/}
                        {/*/!*<input placeholder="Search for friends" className="chatMenuInput"/>*!/*/}
                        {conversations.map((c) => (
                            <div key={c._id} onClick={() => {
                                setCurrentChat(c)
                                badge(c)
                            }}>
                                <Conversation conversation={c} currentUser={user} notic={countNotif}/>
                            </div>
                        ))}
                    </div>
                </div>

                {/*------------------------------------------------------------------------------------------------------------*/}

                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ? (
                                <>
                                    <div className="chatBoxTop">
                                        {messages.map((m) => (
                                            <div key={m._id} ref={scrollRef}>
                                                <Message message={m} own={m.sender === user.id}/>
                                            </div>
                                        ))}
                                    </div>
                                    <div  className="chatBoxBottom">
                                    <textarea className="chatMessageInput"
                                              placeholder="כתוב כאן....."
                                              onChange={(e) => setNewMessage(e.target.value)}
                                              value={newMessage}
                                    >
                        </textarea>
                                        <button className="chatSubmitButton" onClick={handleSubmit}>
                                            שלח
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <span className="noConversationText">
                             פתח שיחה על מנת להתחיל צ׳אט .
                            </span>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}