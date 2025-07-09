import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import DataFetcher from '../functions/DataFetcher';

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 90 },
   { field: 'time', headerName: 'Hora', width: 180 },
   { field: 'temperature', headerName: 'Temperatura (°C)', width: 180 },
   { field: 'windSpeed', headerName: 'Viento (km/h)', width: 180 },
   {
      field: 'resumen',
      headerName: 'Resumen',
      description: 'No es posible ordenar u ocultar esta columna.',
      sortable: false,
      hideable: false,
      width: 300,
      valueGetter: (_, row) => `A las ${row.time}, T: ${row.temperature}°, V: ${row.windSpeed} km/h`,
   },
];

export default function TableUI() {
   const { data, loading, error } = DataFetcher();

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
               pagination: {
                  paginationModel: {
                     pageSize: 10,
                  },
               },
            }}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
         />
      </Box>
   );
}
