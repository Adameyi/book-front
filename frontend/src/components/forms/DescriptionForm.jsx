import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function DescriptionForm({ label, rows, name, value, onChange, onBlur }) {
  return (
    <TextField
      className='w-full'
      id="outlined-multiline-static"
      label={label}
      multiline
      rows={rows}
      value={value}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}
