import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import DataFetcher from '../functions/DataFetcher';

export default function ChartUI() {
   const { data, loading, error } = DataFetcher();

   if (loading) return <CircularProgress />;
   if (error) return <Alert severity="error">{error}</Alert>;
   if (!data) return null;

   const labels = data.hourly.time.slice(0, 24); // Solo las primeras 24 horas
   const tempData = data.hourly.temperature_2m.slice(0, 24);
   const windData = data.hourly.wind_speed_10m.slice(0, 24);

   return (
      <>
         <Typography variant="h5" component="div">
            Temperatura y Viento (por hora)
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: tempData, label: `Temp (${data.hourly_units.temperature_2m})` },
               { data: windData, label: `Viento (${data.hourly_units.wind_speed_10m})` },
            ]}
            xAxis={[{ scaleType: 'point', data: labels }]}
         />
      </>
   );
}
