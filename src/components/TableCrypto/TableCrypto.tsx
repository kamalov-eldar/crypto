import { FC, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TCoin, TChangeColor } from '../../types';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../root-store-context';
import { StyledBoxPrice, StyledTableCell, StyledTypography } from './styles';

interface TableCryptoProps {
    coins: TCoin[];
    diffObj: TChangeColor;
}

export const TableCrypto: FC = observer(({}) => {
   // console.log('TableCrypto: ');
    const { currenciesStore } = useStores();
    const { coins, changeСolor, message, data } = currenciesStore;

    return (
        <TableContainer component={Paper} elevation={3}>
            <Table stickyHeader /* sx={{ minWidth: 850 }} */>
                <TableHead>
                    <TableRow sx={{ th: { fontSize: '12px', fontWeight: 700 } }}>
                        <TableCell sx={{ width: '10px' }}></TableCell>
                        <TableCell sx={{ minWidth: '98px' }} align='left'>
                            Coin
                        </TableCell>
                        <TableCell align='center' style={{ width: '200px' }}>
                            Price
                        </TableCell>
                        <TableCell sx={{ minWidth: '98px' }} align='left'>
                            Price Day
                        </TableCell>
                        <TableCell align='left'>Change Day</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.case({
                        pending: () => (
                            <TableRow className='loader'>
                                <span className='loader__text'>Загрузка...</span>
                            </TableRow>
                        ),
                        rejected: () => <TableRow>Error</TableRow>,
                        fulfilled: (data) => {
                            return (
                                <>
                                    {data.coins.map((coin) => {
                                        return (
                                            <TableRow hover key={coin.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <StyledTableCell width='max-content' align='center' component='th' scope='row'>
                                                    <Box sx={{ display: 'inline-flex' }}>
                                                        <img style={{ width: '25px', display: 'block' }} src={coin.imageUrl} alt='' />
                                                    </Box>
                                                </StyledTableCell>
                                                <StyledTableCell align='left' component='th' scope='row'>
                                                    <Typography fontWeight={700}>{coin.name}</Typography>
                                                    <Typography fontWeight={700} color={'#999'}>
                                                        {coin.fullName}
                                                    </Typography>
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    align='left' /* sx={{ backgroundColor: `${changeСolor[coin.name]}` }} */ /* sx={{backgroundColor: message?.flags === 2 ? '#a11b0a' : '#3d9400' }} */
                                                >
                                                    <StyledBoxPrice backgroundColor={changeСolor[coin.name] || '#F5F5F5'}>
                                                        <StyledTypography backgroundColor={changeСolor[coin.name] || '#F5F5F5'}>
                                                            {'$ ' +
                                                                message[coin.name]?.price.toLocaleString('en-US', {
                                                                    // minimumFractionDigits: 5,
                                                                    maximumFractionDigits: 5,
                                                                })}
                                                        </StyledTypography>
                                                    </StyledBoxPrice>
                                                </StyledTableCell>
                                                <StyledTableCell align='left'>{coin.volume24hour}</StyledTableCell>
                                                <StyledTableCell align='left'>{coin.changeday}</StyledTableCell>
                                            </TableRow>
                                        );
                                    })}
                                </>
                            );
                        },
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
});
