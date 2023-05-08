import styled from 'styled-components';
import { Box, TextField, Select, Stack } from '@mui/material';

export const StyledInputBox = styled(Box)`
    display: flex;

    .Select {
        &.Mui-focused {
            & .MuiOutlinedInput-notchedOutline {
                border-color: #0000003b;
                border-width: 1px;
            }
        }

        .MuiOutlinedInput-notchedOutline {
            border: 1px solid #0000003b;
            border-left: none;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
        &:hover {
            .MuiOutlinedInput-notchedOutline {
                border: 1px solid #0000003b;
                border-left: none;
            }
        }
    }

    .StyledTextField {
        .MuiOutlinedInput-notchedOutline {
            border: 1px solid #0000003b;
            border-right: none;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
        &:hover {
            .MuiOutlinedInput-notchedOutline {
                border: 1px solid #0000003b;
                border-right: none;
            }
        }
    }
    :focus-within {
        &.Mui-focused {
            & .MuiOutlinedInput-notchedOutline {
                border-color: red;
                border-width: 2px;
            }
        }
        .Select {
            &.Mui-focused {
                & .MuiOutlinedInput-notchedOutline {
                    border-color: #1976d2;
                    border-width: 2px;
                }
            }
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

    & .MuiOutlinedInput-notchedOutline {
        //border: 1px solid #0000003b;
        border-right: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border: none;
    }

    .MuiOutlinedInput-root {
        &:hover {
            & .MuiOutlinedInput-notchedOutline {
                //border: 1px solid #0000003b;
                //border-right: none;
                //border: none;
            }
        }
    }
    & .Mui-focused {
        & .MuiOutlinedInput-notchedOutline {
            //border: 1px solid #0000003b !important;
            //border-right: none !important;
            // border: none !important;
        }
    }
`;
export const StyledSelect = styled(Select)`
    & .Select {
        border: 1px solid #0000003b;
    }
    .MuiOutlinedInput-notchedOutline {
        border-left: none;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border: none;
        //border: 1px solid #0000003b;
    }

    &:hover {
        .MuiOutlinedInput-notchedOutline {
            //border: 1px solid #0000003b !important;
            //border-left: none !important;
            //border: none !important;
        }
    }

    &.Mui-focused {
        & .MuiOutlinedInput-notchedOutline {
            //border: 1px solid #0000003b !important;
            //border-left: none !important;
            //border: none !important;
        }
    }
`;
