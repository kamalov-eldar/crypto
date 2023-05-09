import styled from 'styled-components';
import { Box, TextField, Select, Stack } from '@mui/material';
interface StyledInputBoxProps {
    open: boolean;
}
export const StyledInputBox = styled(Box)<StyledInputBoxProps>`
    display: flex;

    &:hover {
        .Select,
        .StyledTextField {
            & .MuiOutlinedInput-notchedOutline {
                border-color: #202124;
                border-width: 1px;
            }
        }
    }

    .Select {
        .MuiOutlinedInput-notchedOutline {
            border: ${(props) => (props.open ? '2px solid #1976d2' : '1px solid #0000003b')};
            border-left: none;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
    }

    .StyledTextField {
        .MuiOutlinedInput-notchedOutline {
            border: ${(props) => (props.open ? '2px solid #1976d2' : '1px solid #0000003b')};
            border-right: none;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
    }
    :focus-within {
        .Select {
            .MuiOutlinedInput-notchedOutline {
                border: 2px solid #1976d2;
                border-left: none;
            }
        }

        .StyledTextField {
            .MuiOutlinedInput-notchedOutline {
                border: 2px solid #1976d2;
                border-right: none;
            }
        }
    }
`;

export const StyledTextField = styled(TextField)`
    & .MuiInputBase-input {
        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }
`;
