import React from 'react';
import { Grid } from '@mui/material';
import "./App.css"

function App() {
  
    return (
      <>  
        <div>
            <h1>Bienvenido al Dashboard</h1>
        </div>
        <Grid container spacing={5} justifyContent="center" alignItems="center">

         {/* Encabezado */}
        <Grid size={{ xs: 12, md: 12 }}>Elemento: Encabezado</Grid>

       

         {/* Alertas */}
         <Grid>Elemento: Alertas</Grid>

         {/* Selector */}
         <Grid size={{ xs: 12, md: 3  }}>Elemento: Selector</Grid>
       

         {/* Indicadores */}
         <Grid size={{ xs: 12, md: 9 }}>Elemento: Indicadores</Grid>
       

         <Grid
            sx={{ display: { xs: "none", md: "block"} }} >
            Elemento: Gráfico
         </Grid>

         <Grid 
            sx={{ display: { xs: "none", md: "block" } }}>
            Elemento: Tabla
         </Grid>

         {/* Información adicional */}
         <Grid>Elemento: Información adicional</Grid>

        </Grid>
      </>
    );
}

export default App;