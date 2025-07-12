import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

interface ChartUIProps {
    loading: boolean;
    error: string | null;
    labels: string[];
    values1: number[];
    values2: number[];
}


export default function ChartUI({ loading, error, labels, values1, values2 }: ChartUIProps) {
    if (loading) return <Typography>Cargando gráfico...</Typography>;
   if (error) return <Typography color="error">Error al cargar el gráfico: {error}</Typography>;
   if (!labels.length) return <Typography>No hay datos para mostrar en el gráfico.</Typography>;
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