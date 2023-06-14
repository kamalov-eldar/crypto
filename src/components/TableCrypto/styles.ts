import styled from 'styled-components';
import { Box, TableCell, Typography } from '@mui/material';

interface PriceProps {
    backgroundColor: string | undefined;
}

export const StyledBoxPrice = styled(Box)<PriceProps>`
    background: ${(props) => props.backgroundColor};
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 4px;
    border: 1px solid #eee;
    text-align: center;
    white-space: nowrap;
`;

export const StyledTypography = styled(Typography)<PriceProps>`
    color: ${(props) => (props.backgroundColor === '#F5F5F5' ? '#121212' : '#fff')};
    border: ${(props) => props.backgroundColor === '#F5F5F5' && 0};
    font-weight: ${(props) => (props.backgroundColor === '#F5F5F5' ? 400 : 700)};
    font-size: 16px;
`;

export const StyledTableCell = styled(TableCell)`
    font-size: 16px;
    color: #121212;
    white-space: nowrap;
`;
