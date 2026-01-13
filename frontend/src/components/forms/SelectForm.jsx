import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText'
import Select from '@mui/material/Select';

export default function SelectForm({ label, options, value, name, onChange, onBlur, error, helperText }) {

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Box >
            <FormControl fullWidth error={error}>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label={label}
                    value={value}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                >
                    {
                        options.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))
                    }
                </Select>
                {helperText && <FormHelperText>{helperText}</FormHelperText>}
            </FormControl>
        </Box >
    );
}