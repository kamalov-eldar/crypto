import { useEffect, useState } from 'react';
import { Container, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TCoin } from './types';
import { TableCrypto } from './components/TableCrypto/TableCrypto';
import { CryptoForm } from './components/CryptoForm/CryptoForm';
import { currenciesStore } from './stores/currenciesStore';

import './App.css';
import { observer } from 'mobx-react-lite';
import { setInterval } from 'timers';

const Item = styled(Paper)(({ theme }) => ({
    //backgroundColor: theme.palette.mode === 'light' ? '#cfe8fc' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minWidth: '360px',
}));

function App() {
    console.log('App: ');

    const { getCoins, coins, diffObj, data } = currenciesStore;

    useEffect(() => {
        getCoins();
        //setInterval(() => CurrenciesStore.fetchCoins(), 60000);
    }, []);

    // Без этого ругается TS
    if (!data) {
        return null;
    }

    return (
        <div className='App'>
            {data.case({
                pending: () => (
                    <div className='loader'>
                        <span className='loader__text'>Загрузка...</span>
                    </div>
                ),
                rejected: () => <div>Error</div>,
                fulfilled: (data) => (
                    <Container sx={{ padding: '40px 0' }} maxWidth='lg'>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={8}>
                                <TableCrypto coins={data} diffObj={diffObj} />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <Item elevation={3}>
                                    <CryptoForm coins={data} />
                                </Item>
                            </Grid>
                        </Grid>
                    </Container>
                ),
            })}
        </div>
    );
}

export default observer(App);
