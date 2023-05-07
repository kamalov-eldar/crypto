import { Stack, MenuItem, FormControl, InputLabel, Box } from "@mui/material"
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FC, useEffect, useState } from "react";
import { TCoin } from "../../types";
import CurrenciesStore from "../../stores/currenciesStore";
import { observer } from "mobx-react-lite";
import ConverterStore from '../../stores/converterStore';


export const CryptoForm: FC = observer(() => {

  const [value1, setValue1] = useState<number>(0);
  const [value2, setValue2] = useState<number>(0);
  //console.log('value2: ', value2);
  //console.log('value1: ', value1);

  const coins = CurrenciesStore.items;

  const handleSelectCoin1 = (e: SelectChangeEvent<string>) => {
    const selectName = e.target.value;
    const name = e.target.name;

    const findCoinSelect1 = coins.find(item => item.name === selectName);
    const findCoinSelect2 = coins.find(item => item.name === ConverterStore.selectCoin2.name);

    if (value2) { ConverterStore.setQuantity2(value2); }
    ConverterStore.setQuantity1(0);
    if (findCoinSelect1) { ConverterStore.setSelectedCoin1(findCoinSelect1); }
    if (findCoinSelect2) { ConverterStore.setSelectedCoin2(findCoinSelect2); }

    ConverterStore.setVolume1();
  }
  const handleSelectCoin2 = (e: SelectChangeEvent<string>) => {
    const selectCoinName = e.target.value;
    const name = e.target.name;

    const findCoinSelect2 = coins.find(item => item.name === selectCoinName);
    const findCoinSelect1 = coins.find(item => item.name === ConverterStore.selectCoin1.name);

    if (value1) { ConverterStore.setQuantity1(value1); }
    ConverterStore.setQuantity2(0);


    if (findCoinSelect2) { ConverterStore.setSelectedCoin2(findCoinSelect2); }
    if (findCoinSelect1) { ConverterStore.setSelectedCoin1(findCoinSelect1); }
    ConverterStore.setVolume2();
  }

  const handleChangeQuantity = ({ name, value }: { name: string, value: number }) => {

    if (name === 'Volume1') {
      ConverterStore.setQuantity1(value);
      ConverterStore.setQuantity2(0);
      ConverterStore.setVolume2();

      setValue1(value);
    }

    if (name === 'Volume2') {
      ConverterStore.setQuantity1(0);
      ConverterStore.setQuantity2(value);
      ConverterStore.setVolume1();

      setValue2(value);
    }
  }

  useEffect(() => {
    if (ConverterStore.volume1) {
      setValue1(ConverterStore.volume1);
    }
  }, [ConverterStore.volume1]);

  useEffect(() => {
    if (ConverterStore.volume2) {
      setValue2(ConverterStore.volume2);
    }
  }, [ConverterStore.volume2])


  return (
    <Stack direction={'column'} spacing={3}>
      <Stack direction={'row'} spacing={0.5} sx={{
        justifyContent: 'space-between',
        border: ' 1px solid #0000003b',
        borderRadius: '6px'
      }}>
        <FormControl sx={{ width: '265px' }}>
          <TextField
            //variant="standard"
            type='number'
            name='Volume1'
            label={"Количество"}
            value={value1 || ''}
            onChange={(e) => handleChangeQuantity({
              name: e.target.name,
              value: Number(e.target.value)
            })}
            sx={{
              '& .MuiInputBase-input': {
                '::-webkit-inner-spin-button, ::-webkit-outer-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0
                }
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              }
            }}
            InputLabelProps={{
              shrink: !!value1,
            }}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Валюта</InputLabel>
          <Select
            value={ConverterStore.selectCoin1.name || ''}
            name='Volume1'
            label={"Валюта"}
            sx={{
              width: '85px',
              '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
                overflow: 'inherit'
              }
            }}
            onChange={(e) => handleSelectCoin1(e)}
          >
            {coins.map(coin => <MenuItem key={coin.id} value={coin.name}>{coin.name}</MenuItem>)}
          </Select>
        </FormControl>
      </Stack >
      <Stack direction={'row'} spacing={0.5} sx={{ justifyContent: 'space-between' }}>
        <FormControl sx={{ width: '265px' }}>
          <TextField
            type='number'
            name='Volume2'
            label="Количество"
            value={value2 || ''}
            onChange={(e) => handleChangeQuantity({
              name: e.target.name,
              value: Number(e.target.value)
            })}
            sx={{
              '& .MuiInputBase-input': {
                '::-webkit-inner-spin-button, ::-webkit-outer-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0
                }
              }
            }}
            InputLabelProps={{
              shrink: !!value2,
            }}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Валюта</InputLabel>
          <Select
            name='Volume2'
            value={ConverterStore.selectCoin2.name || ''}
            label={"Валюта"}
            sx={{
              width: '85px',
              '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
                overflow: 'inherit'
              }
            }}
            onChange={(e) => handleSelectCoin2(e)}
          >
            {coins.map(coin => <MenuItem key={coin.id} value={coin.name}>{coin.name}</MenuItem>)}
          </Select>
        </FormControl>
      </Stack >
    </Stack >)
})