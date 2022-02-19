import React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';


function Loading() {

    return (
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2} data-testid="loading">
            <LinearProgress color="secondary" />
            <LinearProgress color="success" />
            <LinearProgress color="inherit" />
        </Stack>
    );
}

export default Loading;