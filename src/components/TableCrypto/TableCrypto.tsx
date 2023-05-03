import { FC } from 'react';
import { Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TCoin } from '../../types';

export type TableCryptoProps = {
  coins: TCoin[] | null;
}

export const TableCrypto: FC<TableCryptoProps> = ({ coins }) => {
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
              key={coin.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left" component="th" scope="row"><img style={{ width: '25px' }} src={coin.imageUrl} alt="" /> </TableCell>
              <TableCell align="left" component="th" scope="row">{coin.name}</TableCell>
              <TableCell align="left">{coin.fullName}</TableCell>
              <TableCell align="left">{coin.price}</TableCell>
              <TableCell align="left">{coin.volume24hour}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)
}