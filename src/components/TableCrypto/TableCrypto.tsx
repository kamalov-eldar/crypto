import { FC, useEffect } from 'react';
import { Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TCoin } from '../../types';
import { observer } from 'mobx-react-lite';
import CurrenciesStore from "../../stores/currenciesStore";
import ConverterStore from '../../stores/converterStore';

/* export type TableCryptoProps = {
  coins: TCoin[];
} */

export const TableCrypto: FC = observer(() => {
  // console.log('TableCrypto: ');

  /* useEffect(() => {
    CurrenciesStore.fetchCoins();
  }, []); */
  useEffect(() => {
    CurrenciesStore.fetchCoins();
    setInterval(() => CurrenciesStore.fetchCoins(), 60000);
  }, [])

  const coins = CurrenciesStore.items
  const diffObj = CurrenciesStore.diffObj
  //console.log('diffObj: ', JSON.stringify(diffObj));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">Coin</TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Price Day</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins && coins.map((coin) => (
            <TableRow
              hover
              key={coin.id}
              sx={{
                cursor: 'pointer',
                '&:last-child td, &:last-child th': { border: 0 }
              }}
            // onClick={() => ConverterStore.setSelectedCoin1(coin)}
            >
              <TableCell align="left" component="th" scope="row"><img style={{ width: '25px' }} src={coin.imageUrl} alt="" /> </TableCell>
              <TableCell align="left" component="th" scope="row">{coin.name}</TableCell>
              <TableCell align="left">{coin.fullName}</TableCell>
              <TableCell align="left" sx={{ backgroundColor: `${diffObj[coin.name]}` }}>{coin.price}</TableCell>
              <TableCell align="left">{coin.volume24hour}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)
})

