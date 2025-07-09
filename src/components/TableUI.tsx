import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface Props {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'time', headerName: 'Hora', width: 180 },
  { field: 'temperature', headerName: 'Temperatura (°C)', width: 180 },
  { field: 'windSpeed', headerName: 'Viento (km/h)', width: 180 },
  {
    field: 'resumen',
    headerName: 'Resumen',
    width: 300,
    sortable: false,
    hideable: false,
    valueGetter: (_, row) => `A las ${row.time}, T: ${row.temperature}°, V: ${row.windSpeed} km/h`,
  },
];

export default function TableUI({ data, loading, error }: Props) {
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!data) return null;

  const rows = data.hourly.time.slice(0, 24).map((time, index) => ({
    id: index,
    time,
    temperature: data.hourly.temperature_2m[index],
    windSpeed: data.hourly.wind_speed_10m[index],
  }));

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
