import React, { useEffect } from "react";
import { CChart } from "@coreui/react-chartjs";

export default ({ inventoryData, tastes }) => {

  useEffect(() => {
    
    return () => {}
  }, []);

  return (
    <div
      style={{
        backgroundColor: "rgba(94,29,84,0.85)",
        display: "flex",
        flexDirection: "column",
        color: "white",
        height: "63vh",
      }}
    >
      <h3>Total Inventory:</h3>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <span >
          <CChart
            style={{ height: "25vh" }}
            type="pie"
            data={{
              labels: tastes,
              datasets: [
                {
                  borderWidth: 3,
                  borderColor: "white",

                  backgroundColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(255, 205, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(201, 203, 207, 1)",
                  ],
                  label: "Quantity",

                  data: inventoryData ? Object.values(inventoryData) : [],
                },
              ],
            }}
            labels="tastes"
          />
        </span>
      </div>
    </div>
  );
};
