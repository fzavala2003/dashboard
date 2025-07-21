import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

interface ChartUIProps {
    labels: string[];
    values1: number[];
    values2: number[];
}


export default function ChartUI({labels, values1, values2 }: ChartUIProps) {
   return (
      <>
         <Typography variant="h5" component="div">
            Temperatura y Viento por Hora
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: values1, label: 'Temperatura (°C)' },
               { data: values2, label: 'Viento (km/h)' },
            ]}
            xAxis={[{ scaleType: 'point', data: labels }]}
         />
      </>
   );
}