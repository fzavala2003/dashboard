import SelectorUI  from './components/SelectorUI.tsx'
import IndicatorUI from './components/IndicatorUI.tsx'
import DataFetcher from './functions/DataFetcher';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import { useState } from 'react';
import './App.css'
import { Grid } from '@mui/material'

function App() {
  const [city, setCity] = useState<string>("guayaquil");

  const cityCoords: Record<string, { lat: number, lon: number }> = {
    guayaquil: { lat: -2.1962, lon: -79.8862 },
    quito: { lat: -0.1807, lon: -78.4678 },
    manta: { lat: -0.9677, lon: -80.7089 },
    cuenca: { lat: -2.9006, lon: -79.0045 }
  };

  const coords = cityCoords[city];

  // Pasa las coordenadas a DataFetcher
  const dataFetcherOutput = DataFetcher(coords.lat, coords.lon);
  const hourly = dataFetcherOutput.data?.hourly;
  const loading = dataFetcherOutput.loading;
  const error = dataFetcherOutput.error;

  return (
    <>
      <div>
        <h1>Bienvenido al Dashboard</h1>
      </div>
      <Grid container spacing={5} justifyContent="center" alignItems="Center">
        {/* Encabezado */}
        <Grid size={{ xs: 12 }}>Elemento: Encabezado</Grid>

        {/* Alertas */}
        <Grid size={{ xs: 12 }}>Elemento: Alertas</Grid>

        {/* Selector */}
        <Grid size={{ xs: 12, md: 3}}><SelectorUI onCityChange={setCity} /></Grid>

        {/* Indicadores */}
        <Grid container size={{ xs: 12, md: 9 }} >

          {/* Renderizado condicional de los datos obtenidos */}
          {dataFetcherOutput.loading && <p>Cargando datos...</p>}
          {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
          {dataFetcherOutput.data && (
          <>

          {/* Indicadores con datos obtenidos */}

          <Grid size={{ xs: 12, md: 3 }} >
            <IndicatorUI
              title='Temperatura (2m)'
              description={dataFetcherOutput.data.current.temperature_2m + " " + dataFetcherOutput.data.current_units.temperature_2m} />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI
              title='Temperatura aparente'
              description={dataFetcherOutput.data.current.apparent_temperature + " " + dataFetcherOutput.data.current_units.apparent_temperature} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Velocidad del viento'
                description={dataFetcherOutput.data.current.wind_speed_10m + " " + dataFetcherOutput.data.current_units.wind_speed_10m} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Humedad relativa'
                description={dataFetcherOutput.data.current.relative_humidity_2m + " " + dataFetcherOutput.data.current_units.relative_humidity_2m} />
            </Grid>

            </>
            )}
        </Grid>


        {/* Gráfico */}
        <Grid
          sx={{ dispaly: { xs: "none", md: "block" } }} 
          size={{ xs: 6, md: 6}}>
            <ChartUI 
              loading={loading}
              error={error}
              labels={hourly?.time ?? []}
              values1={hourly?.temperature_2m ?? []} 
              values2={hourly?.wind_speed_10m ?? []}
            />
          </Grid>

        {/* Tabla */}
        <Grid size={{ xs: 12, md: 6}}>
          <TableUI 
            loading={loading}
            error={error}
            labels={hourly?.time ?? []}
            values1={hourly?.temperature_2m ?? []} 
            values2={hourly?.wind_speed_10m ?? []}
          />
        </Grid>

        {/* Información adicional */}
        <Grid size={{ xs: 12, md: 12}}>Elemento: Información adicional</Grid>

      </Grid>
    </>
  )
}

export default App