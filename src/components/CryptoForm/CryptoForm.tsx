import { Stack, MenuItem, FormControl, InputLabel, Tooltip } from '@mui/material';
import Select from '@mui/material/Select';
import { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { StyledInputBox, StyledTextField } from './styles';
import Divider from '@mui/material/Divider';
import { useStores } from '../../root-store-context';

export const CryptoForm: FC = observer(() => {
    const [openSelect1, setOpenSelect1] = useState<boolean>(false);
    const [openSelect2, setOpenSelect2] = useState<boolean>(false);

    const { converterStore, currenciesStore } = useStores();
    const { volume1, volume2, selectCoin1, selectCoin2, setVolume, setSelectCoin1, setSelectCoin2 } = converterStore;
    const { coins } = currenciesStore;

    return (
        <Stack direction={'column'} spacing={2}>
            <StyledInputBox open={openSelect1}>
                <FormControl sx={{ minWidth: '190px', width: '100%', marginRight: '-1px' }}>
                    <StyledTextField
                        className='StyledTextField'
                        variant='outlined'
                        type='number'
                        name='Volume1'
                        label={'Количество'}
                        value={volume1 || ''}
                        onChange={(e) => setVolume('Volume1', Number(e.target.value))}
                    />
                </FormControl>
                <Divider orientation='vertical' flexItem sx={{ margin: '10px 0' }} />
                <FormControl sx={{ minWidth: '100px' }}>
                    <InputLabel>Валюта</InputLabel>
                    <Select
                        className='Select'
                        value={selectCoin1?.name}
                        name='Volume1'
                        label={'Валюта'}
                        sx={{
                            '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
                                overflow: 'inherit',
                            },
                        }}
                        open={openSelect1}
                        onOpen={() => setOpenSelect1(true)}
                        onClose={() => setOpenSelect1(false)}
                        onChange={(e) => setSelectCoin1(e.target.value)}>
                        {coins.map((coin) => {
                            return (
                                <MenuItem key={coin.id} value={coin.name}>
                                    {coin.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </StyledInputBox>
            <StyledInputBox open={openSelect2}>
                <FormControl sx={{ minWidth: '190px', width: '100%', marginRight: '-1px' }}>
                    <StyledTextField
                        className='StyledTextField'
                        variant='outlined'
                        type='number'
                        name='Volume2'
                        label='Количество'
                        value={volume2 || ''}
                        onChange={(e) => setVolume('Volume2', Number(e.target.value))}
                    />
                </FormControl>
                <Divider orientation='vertical' flexItem sx={{ margin: '10px 0' }} />
                <FormControl sx={{ minWidth: '100px' }}>
                    <InputLabel>Валюта</InputLabel>
                    <Select
                        className='Select'
                        name='Volume2'
                        value={selectCoin2?.name}
                        label={'Валюта'}
                        sx={{
                            '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
                                overflow: 'inherit',
                            },
                        }}
                        open={openSelect2}
                        onOpen={() => setOpenSelect2(true)}
                        onClose={() => setOpenSelect2(false)}
                        onChange={(e) => setSelectCoin2(e.target.value)}>
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
