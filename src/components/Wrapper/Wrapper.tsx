import { useEffect } from 'react';
import { Container, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { observer } from 'mobx-react-lite';
import { useStores } from '../../root-store-context';
import { TableCrypto } from '../TableCrypto/TableCrypto';
import { CryptoForm } from '../CryptoForm/CryptoForm';

const Item = styled(Paper)(({ theme }) => ({
    //backgroundColor: theme.palette.mode === 'light' ? '#cfe8fc' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minWidth: '360px',
}));

function Wrapper() {
    // console.log('Wrapper: ');

    const { currenciesStore } = useStores();
    const { getCoins, data, getTickCoins, getCoinsName, coins } = currenciesStore;

    useEffect(() => {
        getCoins();
        getCoinsName();
        //getTickCoins();
        // openWS();
        /*  setInterval(() => {
            console.log('setInterval');
            getCoins();
        }, 30000); */
    }, []);

    useEffect(() => {
        setInterval(() => {
            console.log('setInterval');
            // getTickCoins();
        }, 20000);
    }, []);

    // Без этого error TS
    if (!data) {
        return null;
    }

    return (
        <>
            {data?.case({
                pending: () => (
                    <div className='loader'>
                        <span className='loader__text'>Загрузка...</span>
                    </div>
                ),
                rejected: () => <div>Error</div>,
                fulfilled: () => (
                    <Container sx={{ padding: '30px 0' }} maxWidth='lg'>
                        <Grid container spacing={2} sx={{ flexWrap: 'nowrap' }}>
                            <Grid item xs={6} md={8} sx={{ minWidth: '720px' }}>
                                <TableCrypto />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <Item sx={{ minWidth: 'auto' }} elevation={3}>
                                    <CryptoForm />
                                </Item>
                            </Grid>
                        </Grid>
                    </Container>
                ),
            })}
        </>
    );
}

export default observer(Wrapper);
