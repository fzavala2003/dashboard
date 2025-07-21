import { useState } from 'react'
import './App.css'
import SelectorUI from './components/SelectorUI';
import { Grid } from '@mui/material'
import clima from './assets/clima.png';
import dataFetcher from './functions/dataFetcher';
import IndicatorUI from './components/IndicatorUI';
import ChartUI from './components/ChartUI';
import TableUI from './components/TableUI';


function App() {
  const [city,setCity]=useState("guayaquil");
  const cityCoords: Record<string, { lat: number, lon: number }> = {
    guayaquil: { lat: -2.1962, lon: -79.8862 },
    quito: { lat: -0.1807, lon: -78.4678 },
    manta: { lat: -0.9677, lon: -80.7089 },
    cuenca: { lat: -2.9006, lon: -79.0045 }
  };

  const coords = cityCoords[city];
  const df = dataFetcher(coords.lat, coords.lon);

  return (
    <>    
        <div id="encabezado">
          <div id="titulo"> 
            <h3 >📍 Dashboard del clima </h3> 
          </div>
          <div id="logo">
            <img id="img_logo"src={clima} alt="logo" />
          </div>
          <div id="selector">
            <SelectorUI setCiudad={setCity}></SelectorUI>
          </div>
        </div>
        <Grid container size={{ xs: 12, md: 9 }} spacing={3} sx={{padding: 5}}>
        {df.loading && <p>Cargando datos...</p>}
          {df.error && <p>Error: {df.error}</p>}
          {df.data && (
          <>

          {/* Indicadores con datos obtenidos */}

          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI
              title='Temperatura (2m)'
              description={df.data.current.temperature_2m + " " + df.data.current_units.temperature_2m} />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI
              title='Temperatura aparente'
              description={df.data.current.apparent_temperature + " " + df.data.current_units.apparent_temperature} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Velocidad del viento'
                description={df.data.current.wind_speed_10m + " " + df.data.current_units.wind_speed_10m} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Humedad relativa'
                description={df.data.current.relative_humidity_2m + " " + df.data.current_units.relative_humidity_2m} />
            </Grid>

            {/* Gráfico */}
            <Grid
            sx={{ dispaly: { xs: "none", md: "block" } }} 
            size={{ xs: 12, md: 6}}>
              <ChartUI 
                labels={df.data.hourly.time}
                values1={df.data.hourly.temperature_2m} 
                values2={df.data.hourly.wind_speed_10m}
              />
            </Grid>

          {/* Tabla */}
          <Grid size={{ xs: 12, md: 6}} >
            <TableUI 
              labels={df.data.hourly.time}
              values1={df.data.hourly.temperature_2m ?? []} 
              values2={df.data.hourly.wind_speed_10m ?? []}
            />
          </Grid>

            </>
            )}
        </Grid>

    
      
    </>
  )
}

export default App
