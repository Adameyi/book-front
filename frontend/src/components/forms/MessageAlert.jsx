import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box, Typography } from '@mui/material'

export default function MessageAlert({ messageText, alertType }) {
    return (
        <Box className={` ${alertType == 'success' ? 'bg-green-500' : ''} flex w-full h-8 text-white mb-4 p-1`}>
            <Typography>
                {messageText}
            </Typography>
        </Box>
    );
}