import { Stack, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { StyledInputBox, StyledTextField } from './styles';
import Divider from '@mui/material/Divider';
import { TCoin } from '../../types';
import { useStores } from '../../root-store-context';

interface CryptoFormProps {
    coins: TCoin[];
}

export const CryptoForm: FC = observer(({}) => {
    console.log('CryptoForm: ');
    const [value1, setValue1] = useState<number>(0);
    const [value2, setValue2] = useState<number>(0);
    const [openSelect1, setOpenSelect1] = useState<boolean>(false);
    const [openSelect2, setOpenSelect2] = useState<boolean>(false);

    const { converterStore } = useStores();
    const { currenciesStore } = useStores();
    const { items: coins } = currenciesStore;

    const handleSelectCoin1 = (e: SelectChangeEvent<unknown>) => {
        const selectName = e.target.value;
        const name = e.target.name;

        const findCoinSelect1 = coins.find((item) => item.name === selectName);
        const findCoinSelect2 = coins.find((item) => item.name === converterStore.selectCoin2.name);

        if (value2) {
            converterStore.setQuantity2(value2);
        }
        converterStore.setQuantity1(0);
        if (findCoinSelect1) {
            converterStore.setSelectedCoin1(findCoinSelect1);
        }
        if (findCoinSelect2) {
            converterStore.setSelectedCoin2(findCoinSelect2);
        }

        converterStore.setVolume1();
    };
    const handleSelectCoin2 = (e: SelectChangeEvent<unknown>) => {
        const selectCoinName = e.target.value;
        const name = e.target.name;

        const findCoinSelect2 = coins.find((item) => item.name === selectCoinName);
        const findCoinSelect1 = coins.find((item) => item.name === converterStore.selectCoin1.name);

        if (value1) {
            converterStore.setQuantity1(value1);
        }
        converterStore.setQuantity2(0);

        if (findCoinSelect2) {
            converterStore.setSelectedCoin2(findCoinSelect2);
        }
        if (findCoinSelect1) {
            converterStore.setSelectedCoin1(findCoinSelect1);
        }
        converterStore.setVolume2();
    };

    const handleSelectOpen1 = () => {
        setOpenSelect1(true);
    };

    const handleSelectClose1 = () => {
        setOpenSelect1(false);
    };

    const handleSelectOpen2 = () => {
        setOpenSelect2(true);
    };

    const handleSelectClose2 = () => {
        setOpenSelect2(false);
    };

    const handleChangeQuantity = ({ name, value }: { name: string; value: number }) => {
        if (name === 'Volume1') {
            converterStore.setQuantity1(value);
            converterStore.setQuantity2(0);
            converterStore.setVolume2();

            setValue1(value);
        }

        if (name === 'Volume2') {
            converterStore.setQuantity1(0);
            converterStore.setQuantity2(value);
            converterStore.setVolume1();

            setValue2(value);
        }
    };

    useEffect(() => {
        if (converterStore.volume1) {
            setValue1(converterStore.volume1);
        }
    }, [converterStore.volume1]);

    useEffect(() => {
        if (converterStore.volume2) {
            setValue2(converterStore.volume2);
        }
    }, [converterStore.volume2]);

    return (
        <Stack direction={'column'} spacing={2}>
            <StyledInputBox open={openSelect1}>
                <FormControl sx={{ width: '260px', marginRight: '-1px' }}>
                    <StyledTextField
                        className='StyledTextField'
                        variant='outlined'
                        type='number'
                        name='Volume1'
                        label={'Количество'}
                        value={value1 || ''}
                        onChange={(e) =>
                            handleChangeQuantity({
                                name: e.target.name,
                                value: Number(e.target.value),
                            })
                        }
                    />
                </FormControl>
                <Divider orientation='vertical' flexItem sx={{ margin: '10px 0' }} />
                <FormControl>
                    <InputLabel>Валюта</InputLabel>
                    <Select
                        className='Select'
                        value={converterStore.selectCoin1.name || ''}
                        name='Volume1'
                        label={'Валюта'}
                        sx={{
                            width: '100px',
                            '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
                                overflow: 'inherit',
                            },
                        }}
                        open={openSelect1}
                        onOpen={handleSelectOpen1}
                        onClose={handleSelectClose1}
                        onChange={(e) => handleSelectCoin1(e)}>
                        {coins.map((coin) => (
                            <MenuItem key={coin.id} value={coin.name}>
                                {coin.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </StyledInputBox>
            <StyledInputBox open={openSelect2} sx={{ minWidth: '360px' }}>
                <FormControl sx={{ width: '260px', marginRight: '-1px' }}>
                    <StyledTextField
                        className='StyledTextField'
                        variant='outlined'
                        type='number'
                        name='Volume2'
                        label='Количество'
                        value={value2 || ''}
                        onChange={(e) =>
                            handleChangeQuantity({
                                name: e.target.name,
                                value: Number(e.target.value),
                            })
                        }
                    />
                </FormControl>
                <Divider orientation='vertical' flexItem sx={{ margin: '10px 0' }} />
                <FormControl>
                    <InputLabel>Валюта</InputLabel>
                    <Select
                        className='Select'
                        name='Volume2'
                        value={converterStore.selectCoin2.name || ''}
                        label={'Валюта'}
                        sx={{
                            width: '100px',
                            '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
                                overflow: 'inherit',
                            },
                        }}
                        open={openSelect2}
                        onOpen={handleSelectOpen2}
                        onClose={handleSelectClose2}
                        onChange={(e) => handleSelectCoin2(e)}>
                        {coins.map((coin) => (
                            <MenuItem key={coin.id} value={coin.name}>
                                {coin.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </StyledInputBox>
        </Stack>
    );
});
