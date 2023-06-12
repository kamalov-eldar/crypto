import { FC, useEffect } from 'react';
import { Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TCoin, TCoinDiff } from '../../types';
import { observer } from 'mobx-react-lite';

interface TableCryptoProps {
    coins: TCoin[];
    diffObj: TCoinDiff;
}

export const TableCrypto: FC<TableCryptoProps> = observer(({ coins, diffObj }) => {
    // console.log('TableCrypto: ');
    //const { getCoins, coins, diffObj, data } = CurrenciesStore;

    useEffect(() => {
        // getCoins();
        //setInterval(() => CurrenciesStore.fetchCoins(), 60000);
    }, []);

    // Без этого ругается TS
    /* if (!data) {
        return null;
    } */

    return (
        <TableContainer component={Paper} elevation={3}>
            <Table stickyHeader sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align='left'>Coin</TableCell>
                        <TableCell align='left'></TableCell>
                        <TableCell align='left'>Price</TableCell>
                        <TableCell align='left'>Price Day</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {coins.map((coin) => (
                        <TableRow
                            hover
                            key={coin.id}
                            sx={{
                                cursor: 'pointer',
                                '&:last-child td, &:last-child th': { border: 0 },
                            }}>
                            <TableCell align='left' component='th' scope='row'>
                                <img style={{ width: '25px' }} src={coin.imageUrl} alt='' />{' '}
                            </TableCell>
                            <TableCell align='left' component='th' scope='row'>
                                {coin.name}
                            </TableCell>
                            <TableCell align='left'>{coin.fullName}</TableCell>
                            <TableCell align='left' sx={{ backgroundColor: `${diffObj[coin.name]}` }}>
                                {coin.price}
                            </TableCell>
                            <TableCell align='left'>{coin.volume24hour}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});
