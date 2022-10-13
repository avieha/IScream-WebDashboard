import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box } from "@mui/material";
//
import { BaseOptionChart } from ".";

// ----------------------------------------------------------------------

export default function WaitingCallsCounter({ data }) {
    const CHART_DATA = [
        {
            name: "מספר שיחות ממתינות",
            data
        }
    ];

    const chartOptions = merge(BaseOptionChart(), {
        xaxis: {
            type: "datetime"
        },
        yaxis: {
            min: 0,
            tickAmount: 10,
          labels: { formatter: (val) => `שיחות ${val}` }
        },
        tooltip: {
            shared: false,
            intersect: true,
            x: {
                show: false
            }
        },
        legend: {
            horizontalAlign: "left",
            offsetX: 40
        },
        markers: {
            size: 5,
            colors: ["black"],
            strokeWidth: 2,
            strokeOpacity: 0.2
        },
        stroke: {
            curve: "stepline",
            width: 4
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "horizontal",
                shadeIntensity: 0.5,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 25, 50, 75, 100],
                colorStops: [
                    [
                        {
                            offset: 0,
                            color: "#eee",
                            opacity: 1
                        },
                        {
                            offset: 0.6,
                            color: "green",
                            opacity: 50
                        },
                        {
                            offset: 100,
                            color: "red",
                            opacity: 1
                        }
                    ],
                    [
                        {
                            offset: 0,
                            color: "#999",
                            opacity: 1
                        },
                        {
                            offset: 50,
                            color: "blue",
                            opacity: 0.75
                        },
                        {
                            offset: 100,
                            color: "#ddd",
                            opacity: 1
                        }
                    ]
                ]
            }
        }
    });

    return (
        <Card>
            <CardHeader title="מספר שיחות ממתינות" />
            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <ReactApexChart
                    type="line"
                    series={CHART_DATA}
                    options={chartOptions}
                    height={364}
                />
            </Box>
        </Card>
    );
}
