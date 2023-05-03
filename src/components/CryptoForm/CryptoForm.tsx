import { Stack, MenuItem, FormControl, InputLabel } from "@mui/material"
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { FC } from "react";

export const CryptoForm: FC = () => {

  return (
    <Stack direction={'row'} spacing={0.5} sx={{ justifyContent: 'space-between' }}>
      <FormControl sx={{ width: '265px' }}>
        <TextField
          label="Сумма"
        />
      </FormControl>
      <FormControl >
        <InputLabel >Валюта</InputLabel>
        <Select
          value={10}
          label="Валюта"
          sx={{ width: '85px' }}
        //onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Stack>)
}