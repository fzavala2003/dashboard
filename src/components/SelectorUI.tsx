import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface SelectorUiProps {
  setCiudad: (ciudad: string) => void;
}

export default function SelectorUI({setCiudad}: SelectorUiProps){
    const changeCity = (event: SelectChangeEvent) => {
        setCiudad(event.target.value);
    };
    return (
      <FormControl fullWidth>
        <InputLabel id="city-select-label">Ciudad</InputLabel>
        <Select onChange={changeCity} labelId="city-select-label"
            label="Ciudad"          
            defaultValue="guayaquil"
        >
          <MenuItem value="guayaquil">Guayaquil</MenuItem>
          <MenuItem value="quito">Quito</MenuItem>
          <MenuItem value="manta">Manta</MenuItem>
          <MenuItem value="cuenca">Cuenca</MenuItem>
        </Select>
      </FormControl>
    )

}