import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

interface SelectorUIProps {
  onCityChange: (lat: number, lon: number) => void;
}

// Mapa con ciudades y sus coordenadas (latitud, longitud)
const cities = [
  { name: 'Guayaquil', lat: -2.170998, lon: -79.922359 },
  { name: 'Quito', lat: -0.180653, lon: -78.467838 },
  { name: 'Manta', lat: -0.955583, lon: -80.712647 },
  { name: 'Cuenca', lat: -2.90055, lon: -79.00459 },
];

export default function SelectorUI({ onCityChange }: SelectorUIProps) {
  const [city, setCity] = React.useState<string>(cities[0].name);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedCity = event.target.value;
    setCity(selectedCity);

    const cityData = cities.find(c => c.name === selectedCity);
    if (cityData) {
      onCityChange(cityData.lat, cityData.lon);
    }
  };

  return (
    <FormControl fullWidth sx={{ maxWidth: 300, mb: 3 }}>
      <InputLabel id="city-select-label">Ciudad</InputLabel>
      <Select
        labelId="city-select-label"
        value={city}
        label="Ciudad"
        onChange={handleChange}
      >
        {cities.map(({ name }) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
