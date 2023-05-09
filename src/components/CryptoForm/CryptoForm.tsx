import { Stack, MenuItem, FormControl, InputLabel, Box } from "@mui/material"
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ChangeEvent, FC, useEffect, useState } from "react";
import { TCoin } from "../../types";
import CurrenciesStore from "../../stores/currenciesStore";
import { observer } from "mobx-react-lite";
import ConverterStore from '../../stores/converterStore';
import { StyledInputBox, StyledTextField } from "./styles";
import Divider from '@mui/material/Divider';

export const CryptoForm: FC = observer(() => {

  const [value1, setValue1] = useState<number>(0);
  const [value2, setValue2] = useState<number>(0);
  const [openSelect1, setOpenSelect1] = useState<boolean>(false);
  const [openSelect2, setOpenSelect2] = useState<boolean>(false);
  console.log('openSelect: ', openSelect1);
  //console.log('value2: ', value2);
  //console.log('value1: ', value1);

  const coins = CurrenciesStore.items;

  const handleSelectCoin1 = (e: SelectChangeEvent<unknown>) => {
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
  const handleSelectCoin2 = (e: SelectChangeEvent<unknown>) => {
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

  const handleSelectOpen1 = () => {
    setOpenSelect1(true)
  }

  const handleSelectClose1 = () => {
    setOpenSelect1(false);
  }

  const handleSelectOpen2 = () => {
    setOpenSelect2(true)
  }

  const handleSelectClose2 = () => {
    setOpenSelect2(false);
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
    <Stack direction={'column'} spacing={2}>
      <StyledInputBox open={openSelect1}>
        <FormControl sx={{ width: '260px', marginRight: '-1px' }}>
          <StyledTextField
            //variant="standard"
            className="StyledTextField"
            variant="outlined"
            type='number'
            name='Volume1'
            label={"Количество"}
            value={value1 || ''}
            onChange={(e) => handleChangeQuantity({
              name: e.target.name,
              value: Number(e.target.value)
            })}
          /* InputLabelProps={{
            shrink: !!value1,
          }} */
          />
        </FormControl>
        <Divider orientation="vertical" flexItem sx={{ margin: '10px 0' }} />
        <FormControl>
          <InputLabel>Валюта</InputLabel>
          <Select
            className="Select"
            value={ConverterStore.selectCoin1.name || ''}
            name='Volume1'
            label={"Валюта"}
            sx={{
              width: '100px',
              '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
                overflow: 'inherit'
              }
            }}
            open={openSelect1}
            onOpen={handleSelectOpen1}
            onClose={handleSelectClose1}
            onChange={(e) => handleSelectCoin1(e)}
          >
            {coins.map(coin => <MenuItem key={coin.id} value={coin.name}>{coin.name}</MenuItem>)}
          </Select>
        </FormControl>
      </StyledInputBox >
      <StyledInputBox open={openSelect2} sx={{ minWidth: '360px' }}>
        <FormControl sx={{ width: '260px', marginRight: '-1px' }}>
          <StyledTextField
            className="StyledTextField"
            variant="outlined"
            type='number'
            name='Volume2'
            label="Количество"
            value={value2 || ''}
            onChange={(e) => handleChangeQuantity({
              name: e.target.name,
              value: Number(e.target.value)
            })}
          /*  InputLabelProps={{
             shrink: !!value2,
           }} */
          />
        </FormControl>
        <Divider orientation="vertical" flexItem sx={{ margin: '10px 0' }} />
        <FormControl>
          <InputLabel>Валюта</InputLabel>
          <Select
            className="Select"
            name='Volume2'
            value={ConverterStore.selectCoin2.name || ''}
            label={"Валюта"}
            sx={{
              width: '100px',
              '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
                overflow: 'inherit'
              }
            }}
            open={openSelect2}
            onOpen={handleSelectOpen2}
            onClose={handleSelectClose2}
            onChange={(e) => handleSelectCoin2(e)}
          >
            {coins.map(coin => <MenuItem key={coin.id} value={coin.name}>{coin.name}</MenuItem>)}
          </Select>
        </FormControl>
      </StyledInputBox >
    </Stack >)
})