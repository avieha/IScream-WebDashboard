import React, {useEffect} from "react";
import {CChart} from "@coreui/react-chartjs";
import PieChart, {
    Legend,
    Export,
    Series,
    Label,
    Font,
    Connector,
} from 'devextreme-react/pie-chart';

export default ({inventoryData, tastes}) => {

    useEffect(() => {

        return () => {
        }
    }, []);

    return (
        // <div
        //     style={{
        //         backgroundColor: "rgba(94,29,84,0.85)",
        //         display: "flex",
        //         flexDirection: "column",
        //         color: "white",
        //         height: "63vh",
        //     }}
        // >
        <div>
            <h3>Total Inventory:</h3>

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
        <span>
            <PieChart id="pie"
                      palette="Bright"
                      dataSource={inventoryData}
                      title="work alreadyyyyyyy"
            >
                <Legend
                    orientation="horizontal"
                    itemTextPosition="right"
                    horizontalAlignment="center"
                    verticalAlignment="bottom"
                    columnCount={4}/>
                <Export enabled={true}/>
                <Series argumentField="country" valueField="medals">
                    <Label
                        visible={true}
                        position="columns"
                        customizeText={tastes}>
            <Font size={16}/>
            <Connector visible={true} width={0.5}/>
          </Label>
        </Series>
      </PieChart>
        </span>
            </div>
        </div>
    );
};
