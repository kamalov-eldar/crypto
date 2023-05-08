import styled from 'styled-components';
import { Box, TextField, Select, Stack } from '@mui/material';

export const StyledTextField = styled(TextField)`
    & .MuiInputBase-input {
        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }

    & .MuiOutlinedInput-notchedOutline {
        border-right: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .MuiOutlinedInput-root {
        &:hover {
            & .MuiOutlinedInput-notchedOutline {
                border: 1px solid #0000003b;
                border-right: none;
            }
        }
    }
    & .Mui-focused {
        & .MuiOutlinedInput-notchedOutline {
            border: 1px solid #0000003b !important;
            border-right: none !important;
        }
    }
`;
export const StyledSelect = styled(Select)`
    .MuiOutlinedInput-notchedOutline {
        border-left: none;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    &:hover {
        .MuiOutlinedInput-notchedOutline {
            border: 1px solid #0000003b !important;
            border-left: none !important;
        }
    }

    &.Mui-focused {
        & .MuiOutlinedInput-notchedOutline {
            border: 1px solid #0000003b !important;
            border-left: none !important;
        }
    }
`;
