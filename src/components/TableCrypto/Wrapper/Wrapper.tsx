import { useEffect } from 'react';
import { Container, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { observer } from 'mobx-react-lite';
import { useStores } from '../../../root-store-context';
import { TableCrypto } from '../TableCrypto';
import { CryptoForm } from '../../CryptoForm/CryptoForm';

const Item = styled(Paper)(({ theme }) => ({
    //backgroundColor: theme.palette.mode === 'light' ? '#cfe8fc' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minWidth: '360px',
}));

function Wrapper() {
    console.log('Wrapper: ');

    const { currenciesStore } = useStores();
    const { getCoins, items: coins, diffObj, data } = currenciesStore;

    useEffect(() => {
        getCoins();
        setInterval(() => {
            console.log('setInterval');
            getCoins();
        }, 30000);
    }, []);

    // Без этого error TS
    if (!data) {
        return null;
    }

    return (
        <div className='App'>
            {data?.case({
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
                                <TableCrypto />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <Item elevation={3}>
                                    <CryptoForm />
                                </Item>
                            </Grid>
                        </Grid>
                    </Container>
                ),
            })}
        </div>
    );
}

export default observer(Wrapper);
