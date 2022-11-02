import React from "react";
import {CDBBtn, CDBContainer, CDBIframe, CDBView} from "cdbreact";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

// import getWeather from "../../../Services/BatchLayer/api/Weather";
import "./Profile.css"

export const Profile = () => {

    // document.getElementById("header").innerHTML = getWeather(Date.now(),"ירושלים");

    return (
        <div className="d-flex profile">
            <div style={{flex: "1 1 auto", display: "flex", flexFlow: "column", height: "100vh", overflowY: "hidden"}}>
                <Navbar/>
                <div className="dashboard d-flex">
                    <div>
                        <Sidebar/>
                    </div>
                    <div style={{
                        flex: "1 1 auto",
                        display: "flex",
                        flexFlow: "column",
                        height: "100vh",
                        overflowY: "hidden"
                    }}>
                        <Navbar/>
                        <div style={{height: "100%"}}>
                            <div style={{height: "calc(100% - 64px)", overflowY: "scroll"}}>
                                <div className="d-flex card-section">
                                    <div className="cards-container">
                                        <div className="card-bg w-100 border d-flex flex-column">
                                            <div className="p-4 d-flex flex-column h-100">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h4 className="m-0 h5 font-weight-bold text-dark">:תחזית צריכה</h4>
                                                    <div className="px-2 py-1 bg-grey rounded-circle"></div>
                                                </div>
                                                <div className="mt-3 d-flex justify-content-between">
                                                    <CDBContainer style={{width: "350px", height: "300px"}}
                                                                  className="p-0">
                                                        <h5 id="header">The predicted consumption for $branch is $$</h5>
                                                    </CDBContainer>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <footer className="footer">
                                    <div className="d-flex align-items-center">
                                <span className="footer-rem" style={{
                                    fontSize: "3em",
                                    margin: "-2rem 0px -1.5rem 1rem",
                                    color: "#C4C4C4"
                                }}>&#8226;</span>
                                        <small className="ml-2 mt-1">&copy; Powered By Asif Rot, Gal Braymok, Aviem
                                            Hadar.</small>
                                    </div>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}