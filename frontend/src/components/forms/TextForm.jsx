import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function TextForm({label, value, name, onChange, onBlur}) {
    return (
        <TextField
            id="standard-basic"
            label = {label}
            value = {value}
            name = {name}
            onChange = {onChange}
            onBlur={onBlur}
            variant="outlined" />
    );
}