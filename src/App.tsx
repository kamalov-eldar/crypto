import { useEffect, useState } from 'react';
import axios, { isCancel, AxiosError } from 'axios';
import { Container, Paper, Grid, } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TCoin } from './types';
import { TableCrypto } from './components/TableCrypto/TableCrypto';
import './App.css';
import { CryptoForm } from './components/CryptoForm/CryptoForm';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#cfe8fc' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



function App() {

  const [coins, setCoins] = useState<TCoin[] | null>(null);
  console.log('coins: ', coins);

  useEffect(() => {
    axios.get(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD`).then(({ data }) => {
      const coins: TCoin[] = data.Data.map((coin: any) => {
        console.log('coin: ', coin);
        const obj: TCoin = {
          id: coin.CoinInfo.Id,
          name: coin.CoinInfo.Name,
          fullName: coin.CoinInfo.FullName,
          imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
          price: coin.DISPLAY.USD.PRICE,
          volume24hour: coin.DISPLAY.USD.VOLUME24HOUR,
        }
        return obj
      });
      setCoins(coins);
    })
  }, [])


  return (
    <div className="App">
      <Container sx={{ padding: '40px 0' }} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>

            <TableCrypto coins={coins} />

          </Grid>
          <Grid item xs={6} md={4}>
            <Item sx={{ bgcolor: '#cfe8fc' }} elevation={3} >
              <CryptoForm></CryptoForm>
            </Item>
          </Grid>
        </Grid>
      </Container>
    </div >
  );
}

export default App;

