// import React, {useState, useEffect} from "react";
// import {Chart as ChartJS, ArcElement, Tooltip, Legend, Title} from 'chart.js';
// import {Pie} from 'react-chartjs-2';
// import axios from "axios";
//
// ChartJS.register(ArcElement, Tooltip, Legend, Title);
//
// function TotalInventory() {
//
//     const [inventory, setinventory] = useState(null);
//     const [tastes, setTastes] = useState(null);
//     // const [error, setError] = useState(null);
//     console.log("HEEREEEEEEEEE");
//     useEffect(() => {
//         // console.log("ERROR in useEffect");
//         fetch()
//             .get("http://localhost:3002/api/getAllInventory")
//             .then((inventory) => {
//                 console.log("DATAA:",inventory.data);
//                 setinventory(inventory.data);
//             })
//             .catch((err) => {
//                 console.log("ERROR in first");
//             });
//         console.log("SECOND:");
//         axios
//             .get("http://localhost:3002/api/getTastes")
//             .then((tastes) => {
//                 setTastes(tastes.data);
//             })
//             .catch((err) => {
//                 console.log("ERROR in second");
//             });
//     }, ["http://localhost:3002/api/getAllInventory","http://localhost:3002/api/getTastes"]);
//
//     return (
//         <React.Fragment>
//             <div className="container-fluid">
//                 <h1 className="mt-3">Top 10 Countries with the highest population</h1>
//                 <div className="row">
//                     <div className="col-md-5 mb-3 mt-3 ">
//                         <Pie
//                             width={300}
//                             height={200}
//                             data={{
//                                 labels: tastes,
//                                 datasets: [
//                                     {
//                                         label: '# of Votes',
//                                         data: inventory,
//                                         backgroundColor: [
//                                             'rgba(255, 99, 132, 0.2)',
//                                             'rgba(54, 162, 235, 0.2)',
//                                             'rgba(255, 206, 86, 0.2)',
//                                             'rgba(75, 192, 192, 0.2)',
//                                             'rgba(153, 102, 255, 0.2)',
//                                             'rgba(255, 159, 64, 0.2)',
//                                             'rgba(255, 109, 64, 0.6)',
//                                             'rgba(125, 169, 34, 0.8)',
//                                             'rgba(225, 99, 251, 0.3)',
//                                             'rgba(225, 99, 101, 0.4)',
//
//                                         ],
//                                         borderColor: [
//                                             'rgba(255, 99, 132, 1)',
//                                             'rgba(54, 162, 235, 1)',
//                                             'rgba(255, 206, 86, 1)',
//                                             'rgba(75, 192, 192, 1)',
//                                             'rgba(153, 102, 255, 1)',
//                                             'rgba(255, 159, 64, 1)',
//                                             'rgba(255, 109, 64, 0.6)',
//                                             'rgba(125, 169, 34, 0.8)',
//                                             'rgba(225, 99, 251, 0.3)',
//                                             'rgba(225, 99, 101, 0.4)',
//                                         ],
//                                         borderWidth: 1,
//                                         //hoverOffset:20
//                                         offset: [20, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//                                     },
//                                 ],
//                             }}
//
//                             options={{
//                                 responsive: true,
//                                 plugins: {
//                                     title: {
//                                         fontSize: 30,
//                                         text: 'Chart js tutorial',
//                                         display: true,
//                                         font: {size: 20}
//                                     },
//                                     legend: {
//                                         labels: {
//                                             font: {size: 15}
//                                         }
//                                     }
//                                 },
//                             }}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </React.Fragment>
//     );
//
//     // useEffect(() => {
//     //
//     //     return () => {
//     //     }
//     // }, []);
//
//     // return (
//     //     // <div
//     //     //     style={{
//     //     //         backgroundColor: "rgba(94,29,84,0.85)",
//     //     //         display: "flex",
//     //     //         flexDirection: "column",
//     //     //         color: "white",
//     //     //         height: "63vh",
//     //     //     }}
//     //     // >
//     //     <div>
//     //         <h3>Total Inventory:</h3>
//     //
//     //         <div
//     //             style={{
//     //                 display: "flex", flexDirection: "row", justifyContent: "center",
//     //             }}
//     //         >
//     //           <span>
//     //               <PieChart id="pie"
//     //                         palette="bright"
//     //                         dataSource={inventoryData}
//     //                         title="">
//     //                   <Legend
//     //                       orientation="horizontal"
//     //                       itemTextPosition="right"
//     //                       horizontalAlignment="center"
//     //                       verticalAlignment="bottom"
//     //                       columnCount={4}/>
//     //                   <Export enabled={true}/>
//     //                   <Series argumentField="country" valueField="medals">
//     //                       <Label
//     //                           visible={true}
//     //                           position="columns"
//     //                           customizeText={tastes}>
//     //               <Font size={16}/>
//     //               <Connector visible={true} width={0.5}/>
//     //             </Label>
//     //           </Series>
//     //         </PieChart>
//     //           </span>
//     //         </div>
//     //     </div>);
// };
//
// export default TotalInventory;


import React,{useState, useEffect} from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend,  Title} from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, Title);

function Piechart()
{
    const [country, setCountry]= useState(null);
    const [population, setPopulation]=useState(null);
    useEffect( ()=>{
        const getcountry=[];
        const getpopulation=[];
        const getdata= async()=>{
            const reqData= await fetch("http://localhost:3002/api/getTastes");
            const resData= await reqData.json();
            console.log(resData);
            const reqInventory = await fetch("http://localhost:3002/api/getAllInventory");
            const resInventory= await reqData.json();
            console.log(resInventory);
            // for(let i=0; i<resData.length; i++)
            // {
            //     getcountry.push(resData[i].country_name);
            //     getpopulation.push(resData[i].population);
            // }
            setCountry(getcountry);
            setPopulation(getpopulation);
        }
        getdata();
    },[]);

    return(
        <React.Fragment>
            <div className="container-fluid">
                <h1 className="mt-3">Top 10 Countries with the highest population</h1>
                <div className="row">
                    <div className="col-md-5 mb-3 mt-3 ">
                        <Pie
                            width={300}
                            height={200}
                            data={{
                                labels: country,
                                datasets: [
                                    {
                                        label: '# of Votes',
                                        data: population,
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)',
                                            'rgba(255, 109, 64, 0.6)',
                                            'rgba(125, 169, 34, 0.8)',
                                            'rgba(225, 99, 251, 0.3)',
                                            'rgba(225, 99, 101, 0.4)',

                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)',
                                            'rgba(75, 192, 192, 1)',
                                            'rgba(153, 102, 255, 1)',
                                            'rgba(255, 159, 64, 1)',
                                            'rgba(255, 109, 64, 0.6)',
                                            'rgba(125, 169, 34, 0.8)',
                                            'rgba(225, 99, 251, 0.3)',
                                            'rgba(225, 99, 101, 0.4)',
                                        ],
                                        borderWidth: 1,
                                        //hoverOffset:20
                                        offset: [20,0,0,0,0,0,0,0,0,0]
                                    },
                                ],
                            }}

                            options={{
                                responsive: true,
                                plugins:{
                                    title:{
                                        fontSize: 30,
                                        text:'Chart js tutorial',
                                        display: true ,
                                        font:{ size:20}
                                    },
                                    legend:{
                                        labels:{
                                            font:{size:15}
                                        }
                                    }
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );

}
export default Piechart;