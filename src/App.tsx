import { useState } from 'react';
import { Grid } from '@mui/material';
import './App.css';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';

function App() {
  // Estado de la ciudad seleccionada
  const [latLon, setLatLon] = useState<{ lat: number; lon: number }>({
    lat: 52.52,
    lon: 13.41,
  }); // Berlín por defecto

  const { data, loading, error } = DataFetcher(latLon.lat, latLon.lon);

  return (
    <>
      <div>
        <h1>Bienvenido al Dashboard</h1>
      </div>

      {/* Selector de ciudad */}
      <SelectorUI onCityChange={(lat, lon) => setLatLon({ lat, lon })} />

      {/* Indicadores */}
      <Grid container spacing={2} justifyContent="center">
        {loading && <p>Cargando datos...</p>}
        {error && <p>Error: {error}</p>}
        {data && (
          <>
            <Grid item xs={12} md={3}>
              <IndicatorUI
                title='Temperatura (2m)'
                description={`${data.current.temperature_2m} ${data.current_units.temperature_2m}`}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <IndicatorUI
                title='Temperatura aparente'
                description={`${data.current.apparent_temperature} ${data.current_units.apparent_temperature}`}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <IndicatorUI
                title='Velocidad del viento'
                description={`${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <IndicatorUI
                title='Humedad relativa'
                description={`${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`}
              />
            </Grid>
          </>
        )}
      </Grid>

      {/* Gráfico y Tabla */}
      <Grid container spacing={5} justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <ChartUI data={data} loading={loading} error={error} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TableUI data={data} loading={loading} error={error} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
