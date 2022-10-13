import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';

import { fNumber } from '../../utils/formatNumber';
import { BaseOptionChart } from '.';

// ----------------------------------------------------------------------
export default function CallsPerCity({data}) {
  const CHART_DATA = [{ data: Object.values(data) }];
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: Object.keys(data),
    }
  });

  return (
    <Card>
      <CardHeader title="פילוח קניות לפי ערים" subheader="מוצגות הערים המרכזיות בלבד" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
