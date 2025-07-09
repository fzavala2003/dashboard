import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface Props {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
}

export default function ChartUI({ data, loading, error }: Props) {
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!data) return null;

  const labels = data.hourly.time.slice(0, 24);
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
