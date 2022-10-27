import React from "react";
import "./Tables.css";
import {useMemo, useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import {Line} from 'react-chartjs-2';
import {CDBContainer} from "cdbreact";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";


export const Tables = () => {

    const [branches, setBranches] = useState([
        {
            id: 1,
            name: 'Jerusalem',
            stock: {
                Chocolate: 10,
                Vanilla: 20,
                Strawberry: 30,
                Lemon: 10,
                Halvah: 15,
            },
            history: Array.from({length: 10}, (_, i) => ({
                date: new Date(+new Date('2022-10-24') + i * 24 * 60 * 60 * 1000),
                sales: {
                    Chocolate: Math.floor(Math.random() * 10),
                    Vanilla: Math.floor(Math.random() * 10),
                    Strawberry: Math.floor(Math.random() * 10),
                    Lemon: Math.floor(Math.random() * 10),
                    Halvah: Math.floor(Math.random() * 10),
                }
            })),
        },
        {
            id: 2,
            name: 'Tel Aviv',
            stock: {
                Chocolate: 40,
                Vanilla: 50,
                Strawberry: 60,
                Lemon: 60,
                Halvah: 60,
            },
            history: Array.from({length: 10}, (_, i) => ({
                date: new Date(+new Date('2022-10-24') + i * 24 * 60 * 60 * 1000),
                sales: {
                    Chocolate: Math.floor(Math.random() * 10),
                    Vanilla: Math.floor(Math.random() * 10),
                    Strawberry: Math.floor(Math.random() * 10),
                    Lemon: Math.floor(Math.random() * 10),
                    Halvah: Math.floor(Math.random() * 10),
                }
            }))
        }
    ]);

    const chartOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
    }), []);

    const [selectedBranch, setSelectedBranch] = useState(branches[0]);
    const dayName = (date) => {
        return new Date(date).toLocaleDateString('en-US', {weekday: 'short'});
    }

    const chartData = {
        labels: selectedBranch.history.map(h => dayName(h.date)),
        datasets: Object.entries(selectedBranch.history[0].sales).map((s, i) => ({
            label: s[0],
            data: selectedBranch.history.map(h => h.sales[s[0]]),
        }))
    }

    return (
        <div className="dashboard d-flex">
            <div>
                <Sidebar/>
            </div>
            <div style={{flex: "1 1 auto", display: "flex", flexFlow: "column", height: "100vh", overflowY: "hidden"}}>
                <Navbar/>
                <div style={{height: "100%"}}>
                    <div style={{height: "calc(100% - 64px)", overflowY: "scroll"}}>
                        <div className="d-flex card-section">
                            <div className="cards-container">
                                <div className="card-bg w-100 border d-flex flex-column">
                                    <div className="p-4 d-flex flex-column h-100">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h4 className="m-0 h5 font-weight-bold text-dark">:טעמים</h4>
                                            <div className="px-2 py-1 bg-blue rounded-circle"></div>
                                        </div>
                                        <div className="mt-3 d-flex justify-content-between">
                                            <CDBContainer style={{width: "800px", height: "800px"}} className="p-0">
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                        {selectedBranch.name}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        {branches.map((branch) => (
                                                            <Dropdown.Item
                                                                key={branch.id}
                                                                onClick={() => setSelectedBranch(branch)}
                                                            >
                                                                {branch.name}
                                                            </Dropdown.Item>
                                                        ))}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                <div style={{height: '500px'}}>
                                                    <Line data={chartData} options={chartOptions}/>
                                                </div>
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
                                    color: "#1a60cb"
                                }}>&#1a60cb;</span>
                                <small className="ml-2 mt-1">&copy; Powered By Asif Rot, Gal Braymok, Aviem
                                    Hadar.</small>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
};
