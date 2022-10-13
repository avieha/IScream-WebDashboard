import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { useTheme, styled } from '@mui/material/styles';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '.';

// ----------------------------------------------------------------------

export default function CallsPerHour({ data }) {
  const theme = useTheme();
  const chartOptions = merge(BaseOptionChart(), {
    
    // labels: ["חלבה","לימון", "תות", "שוקולד", "וניל"],
    stroke: { width: [0, 2, 3] },
   
    plotOptions: { bar: { columnWidth: '60%', borderRadius: 4 } },
    xaxis: {
      categories: [
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00'
      ]
    },
    
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        }
      }
    }
  });
    
  return (
    <Card>
      <CardHeader title="מספר קניות לפי שעות היום" subheader="(+35%) than last year" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="bar" series={data} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
