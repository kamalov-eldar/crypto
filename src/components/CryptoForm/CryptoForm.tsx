import { Stack, MenuItem, FormControl, InputLabel } from "@mui/material"
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { FC, useEffect } from "react";
import { TCoin } from "../../types";
import CurrenciesStore from "../../stores/currenciesStore";
import { observer } from "mobx-react-lite";

/* export type CryptoFormProps = {
  coins: TCoin[];
} */

export const CryptoForm: FC = observer(() => {
  //console.log('CryptoForm: ');
  /*  useEffect(() => {
     CurrenciesStore.fetchCoins();
   }, []); */
  const coins = CurrenciesStore.items

  const coinsName = coins.map(item => item.name)

  return (
    <Stack direction={'row'} spacing={0.5} sx={{ justifyContent: 'space-between' }}>
      <FormControl sx={{ width: '265px' }}>
        <TextField
          label="Сумма"
        />
      </FormControl>
      <FormControl>
        <InputLabel>Валюта</InputLabel>
        <Select
          value={10}
          label="Валюта"
          sx={{ width: '85px' }}
        //onChange={handleChange}
        >
          {coinsName.map(name => <MenuItem value={name}>{name}</MenuItem>)}
        </Select>
      </FormControl>
    </Stack>)
})